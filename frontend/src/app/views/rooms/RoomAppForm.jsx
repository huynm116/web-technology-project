import { Stack } from '@mui/material';
import { Box, styled } from '@mui/material';
import { Breadcrumb, SimpleCard } from 'app/components';
import RoomForm from './RoomForm';

const Container = styled('div')(({ theme }) => ({
  margin: '30px',
  [theme.breakpoints.down('sm')]: { margin: '16px' },
  '& .breadcrumb': {
    marginBottom: '30px',
    [theme.breakpoints.down('sm')]: { marginBottom: '16px' }
  }
}));

const RoomAppForm = () => {
  return (
    <Container>
      <Box className="breadcrumb">
        <Breadcrumb routeSegments={[{ name: 'Room', path: '/rooms/list' }, { name: 'Add Room' }]} />
      </Box>

      <Stack spacing={3}>
        <SimpleCard title="Add Room">
          <RoomForm />
        </SimpleCard>

      </Stack>
    </Container>
  );
};

export default RoomAppForm;
