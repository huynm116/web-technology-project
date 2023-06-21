import { Stack } from '@mui/material';
import { Box, styled } from '@mui/material';
import { Breadcrumb, SimpleCard } from 'app/components';
import StudentConfirmDialog from './StudentConfirmDialog';

const Container = styled('div')(({ theme }) => ({
  margin: '30px',
  [theme.breakpoints.down('sm')]: { margin: '16px' },
  '& .breadcrumb': {
    marginBottom: '30px',
    [theme.breakpoints.down('sm')]: { marginBottom: '16px' }
  }
}));

const StudentAppDialog = () => {
  return (
    <Container>
      <Box className="breadcrumb">
        <Breadcrumb routeSegments={[{ name: 'Student', path: '/students/list' }, { name: 'Add to room' }]} />
      </Box>

      <Stack spacing={3}>
        <SimpleCard title="Add student to room">
          <StudentConfirmDialog />
        </SimpleCard>
      </Stack>
    </Container>
  );
};

export default StudentAppDialog;
