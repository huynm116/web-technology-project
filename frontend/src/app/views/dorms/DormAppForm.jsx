import { Stack } from '@mui/material';
import { Box, styled } from '@mui/material';
import { Breadcrumb, SimpleCard } from 'app/components';
import DormForm from './DormForm';

const Container = styled('div')(({ theme }) => ({
  margin: '30px',
  [theme.breakpoints.down('sm')]: { margin: '16px' },
  '& .breadcrumb': {
    marginBottom: '30px',
    [theme.breakpoints.down('sm')]: { marginBottom: '16px' }
  }
}));

const DormAppForm = () => {
  return (
    <Container>
      <Box className="breadcrumb">
        <Breadcrumb routeSegments={[{ name: 'Dorm', path: '/dorms/list' }, { name: 'Add Dorm' }]} />
      </Box>

      <Stack spacing={3}>
        <SimpleCard title="Add Dorm">
          <DormForm />
        </SimpleCard>

      </Stack>
    </Container>
  );
};

export default DormAppForm;
