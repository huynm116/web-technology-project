import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import FormControlLabel from '@mui/material/FormControlLabel';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import { styled } from '@mui/material';
import PropTypes from 'prop-types';
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import axios from 'axios';

function ConfirmationDialogRaw(props) {
  const { onClose, value: valueProp, open, dorm_id, ...other } = props;
  const [value, setValue] = useState(valueProp);
  const radioGroupRef = useRef(null);
  const [options, setOptions] = useState(['None']);
  useLayoutEffect(() => {
    let dorm = '';
    onClose('None');
    if(dorm_id!=='None') dorm=`/dorm/${dorm_id}`
    axios.get(`/api/room${dorm}`).then((res) => {
      setOptions(res.data.data);
    }).catch(err => console.log(err));
  }, [dorm_id]);
  useEffect(() => {
    if (!open) {
      setValue(valueProp);
    }
  }, [valueProp, open]);

  function handleEntering() {
    if (radioGroupRef.current !== null) {
      radioGroupRef.current.focus();
    }
  }

  const handleCancel = () => onClose();
  const handleOk = () => onClose(value);

  const handleChange = (_, newValue) => setValue(newValue);

  return (
    <Dialog
      maxWidth="xs"
      disableEscapeKeyDown
      TransitionProps={{ onExiting: handleEntering }}
      aria-labelledby="confirmation-dialog-title"
      open={open}
      {...other}
    >
      <DialogTitle id="confirmation-dialog-title">Room</DialogTitle>
      <DialogContent dividers>
        <RadioGroup
          ref={radioGroupRef}
          aria-label="Room"
          name="room"
          value={value}
          onChange={handleChange}
        >
          {options.sort((a,b) => {return a.room_id - b.room_id}).map((option) => (
            <FormControlLabel value={option.room_id} key={option._id} control={<Radio />} label={option.room_id} />
          ))}
        </RadioGroup>
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" color="secondary" onClick={handleCancel}>
          Cancel
        </Button>
        <Button onClick={handleOk} color="primary">
          Ok
        </Button>
      </DialogActions>
    </Dialog>
  );
}

ConfirmationDialogRaw.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  value: PropTypes.string.isRequired,
  dorm_id: PropTypes.string.isRequired
};

const DialogRoot = styled('div')(({ theme }) => ({
  width: '100%',
  maxWidth: 360,
  backgroundColor: theme.palette.background.paper,
  '& .paper': { width: '80%', maxHeight: 435 }
}));

export default function StudentConfirmRoomDialog(props) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState('None');

  function handleClickListItem() {
    setOpen(true);
  }

  function handleClose(newValue) {
    setOpen(false);

    if (newValue) {
      setValue(newValue);
      props.onValueChange('room_id', newValue);
    }
  }

  return (
    <DialogRoot>
      <List component="div" role="list">


        <ListItem
          button
          divider
          aria-controls="room-menu"
          aria-label="Room"
          onClick={handleClickListItem}
          role="listitem"
        >
          <ListItemText primary="Room" secondary={value} />
        </ListItem>

        <ConfirmationDialogRaw
          keepMounted
          open={open}
          value={value}
          className="paper"
          id="room-menu"
          dorm_id={props.dorm_id}
          onClose={handleClose}
        />



      </List>
    </DialogRoot>
  );
}
