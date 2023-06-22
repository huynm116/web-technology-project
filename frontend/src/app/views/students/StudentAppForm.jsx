import { Stack } from '@mui/material';
import { Box, styled } from '@mui/material';
import { Breadcrumb, SimpleCard } from 'app/components';
import StudentForm from './StudentForm';

const Container = styled('div')(({ theme }) => ({
  margin: '30px',
  [theme.breakpoints.down('sm')]: { margin: '16px' },
  '& .breadcrumb': {
    marginBottom: '30px',
    [theme.breakpoints.down('sm')]: { marginBottom: '16px' }
  }
}));

const StudentAppForm = () => {
  return (
    <Container>
      <Box className="breadcrumb">
        <Breadcrumb routeSegments={[{ name: 'Student', path: '/students/list' }, { name: 'Add Student' }]} />
      </Box>

      <Stack spacing={3}>
        <SimpleCard title="Add Student">
          <StudentForm />
        </SimpleCard>

      </Stack>
    </Container>
  );
};

export default StudentAppForm;
