import { Stack } from '@mui/material';
import { Box, styled } from '@mui/material';
import { Breadcrumb, SimpleCard } from 'app/components';
import StudentConfirmDormDialog from './StudentConfirmDormDialog';
import StudentConfirmRoomDialog from './StudentConfirmRoomDialog';
import { useEffect, useState } from 'react';


const Container = styled('div')(({ theme }) => ({
  margin: '30px',
  [theme.breakpoints.down('sm')]: { margin: '16px' },
  '& .breadcrumb': {
    marginBottom: '30px',
    [theme.breakpoints.down('sm')]: { marginBottom: '16px' }
  }
}));

const StudentAppDialog = () => {
  const [dormId, setDormId] = useState('None');
  useEffect(() => {

  })
  return (
    <Container>
      <Box className="breadcrumb">
        <Breadcrumb routeSegments={[{ name: 'Student', path: '/students/list' }, { name: 'Add to room' }]} />
      </Box>

      <Stack spacing={3}>
        <SimpleCard title="Add student to room">
          <StudentConfirmDormDialog />
          <StudentConfirmRoomDialog />
        </SimpleCard>
      </Stack>
    </Container>
  );
};

export default StudentAppDialog;
