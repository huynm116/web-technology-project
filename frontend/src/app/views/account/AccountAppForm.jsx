import { Stack } from '@mui/material';
import { Box, styled } from '@mui/material';
import { Breadcrumb, SimpleCard } from 'app/components';
import AccountForm from './AccountForm';

const Container = styled('div')(({ theme }) => ({
  margin: '30px',
  [theme.breakpoints.down('sm')]: { margin: '16px' },
  '& .breadcrumb': {
    marginBottom: '30px',
    [theme.breakpoints.down('sm')]: { marginBottom: '16px' }
  }
}));

const AccountAppForm = () => {
  return (
    <Container>
      <Box className="breadcrumb">
        <Breadcrumb routeSegments={[{ name: 'Account', path: '/accounts/list' }, { name: 'Add Account' }]} />
      </Box>

      <Stack spacing={3}>
        <SimpleCard title="Add Account">
          <AccountForm />
        </SimpleCard>

      </Stack>
    </Container>
  );
};

export default AccountAppForm;
