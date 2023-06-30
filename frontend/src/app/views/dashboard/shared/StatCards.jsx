import { Box, Card, Grid, Icon, IconButton, styled, Tooltip } from '@mui/material';
import { Small } from 'app/components/Typography';
import axios from 'axios';
import { useLayoutEffect } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const StyledCard = styled(Card)(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '24px !important',
  background: theme.palette.background.paper,
  [theme.breakpoints.down('sm')]: { padding: '16px !important' },
}));

const ContentBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  '& small': { color: theme.palette.text.secondary },
  '& .icon': { opacity: 0.6, fontSize: '44px', color: theme.palette.primary.main },
}));

const Heading = styled('h6')(({ theme }) => ({
  margin: 0,
  marginTop: '4px',
  fontSize: '14px',
  fontWeight: '500',
  color: theme.palette.primary.main,
}));

const dataType = ['student', 'room', 'dorm', 'auth'];

const StatCards = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({});
  useLayoutEffect(() => {
    const fetchData = async() => {
      try {
        const newData = await Promise.all(
          dataType.map(async(type)=>{
            const res = await axios.get(`/api/${type}`)
            const keyValue = res.data.data.length;
            return keyValue;
          })
        );
        console.log(newData)
        setData(newData);
        
      }catch(err) {
        console.log(err);
      }
    }
    fetchData();
  }, [])
  const cardList = [
    { name: 'Students', amount: data[0], icon: 'group', id: dataType[0]+'s' },
    { name: 'Number of rooms', amount: data[1], icon: 'room' , id: dataType[1]+'s'},
    { name: 'Number of dormitories', amount: data[2], icon: 'business', id: dataType[2]+'s' },
    { name: 'Number of accounts', amount: data[3], icon: 'people_outline', id:'accounts' },
  ];

  return (
    <Grid container spacing={3} sx={{ mb: '24px' }}>
      {cardList.map((item, index) => (
        <Grid item xs={12} md={6} key={index}>
          <StyledCard elevation={6}>
            <ContentBox>
              <Icon className="icon">{item.icon}</Icon>
              <Box ml="12px">
                <Small>{item.name}</Small>
                <Heading>{item.amount}</Heading>
              </Box>
            </ContentBox>

            <Tooltip title="View Details" placement="top">
              <IconButton onClick={() => navigate(`/${item.id}/list`)}>
                <Icon>arrow_right_alt</Icon>
              </IconButton>
            </Tooltip>
          </StyledCard>
        </Grid>
      ))}
    </Grid>
  );
};

export default StatCards;
