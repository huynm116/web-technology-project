import {
  Avatar,
  Box,
  Card,
  Icon,
  IconButton,
  MenuItem,
  Select,
  styled,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  useTheme,
} from '@mui/material';
import { Paragraph } from 'app/components/Typography';
import { useLayoutEffect } from 'react';
import axios from 'axios';
import { useState } from 'react';


const CardHeader = styled(Box)(() => ({
  display: 'flex',
  paddingLeft: '24px',
  paddingRight: '24px',
  marginBottom: '12px',
  alignItems: 'center',
  justifyContent: 'space-between',
}));

const Title = styled('span')(() => ({
  fontSize: '1rem',
  fontWeight: '500',
  textTransform: 'capitalize',
}));

const ProductTable = styled(Table)(() => ({
  minWidth: 400,
  whiteSpace: 'pre',
  '& small': {
    width: 50,
    height: 15,
    borderRadius: 500,
    boxShadow: '0 0 2px 0 rgba(0, 0, 0, 0.12), 0 2px 2px 0 rgba(0, 0, 0, 0.24)',
  },
  '& td': { borderBottom: 'none' },
  '& td:first-of-type': { paddingLeft: '16px !important' },
}));

const Small = styled('small')(({ bgcolor }) => ({
  width: 50,
  height: 15,
  color: '#fff',
  padding: '2px 8px',
  borderRadius: '4px',
  overflow: 'hidden',
  background: bgcolor,
  boxShadow: '0 0 2px 0 rgba(0, 0, 0, 0.12), 0 2px 2px 0 rgba(0, 0, 0, 0.24)',
}));

const TopSellingTable = () => {
  const { palette } = useTheme();
  const bgError = palette.error.main;
  const bgPrimary = palette.primary.main;
  const bgSecondary = palette.secondary.main;
  const [data, setData] = useState([]);
  useLayoutEffect(() => {
    const fetchData = async() => {
      try {
        const res = await axios.get('/api/room');
        const newData = res.data.data.sort((a,b) => {return -a.price+b.price}).slice(0,5);
        console.log(newData);
        setData(newData);
        
      }catch(err) {
        console.log(err);
      }
    }
    fetchData();
  }, [])

  return (
    <Card elevation={3} sx={{ pt: '20px', mb: 3 }}>
      <CardHeader>
        <Title>Top Price Room</Title>
        <Select size="small" defaultValue="this_month">
          <MenuItem value="this_month">This Month</MenuItem>
          <MenuItem value="last_month">Last Month</MenuItem>
        </Select>
      </CardHeader>

      <Box overflow="auto">
        <ProductTable>
          <TableHead>
            <TableRow>
              <TableCell sx={{ px: 3 }} colSpan={4}>
                Room ID
              </TableCell>
              <TableCell sx={{ px: 0 }} colSpan={2}>
                Price
              </TableCell>
              <TableCell sx={{ px: 0 }} colSpan={2}>
                Status
              </TableCell>
              <TableCell sx={{ px: 0 }} colSpan={1}>
                Slot
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {data.map((room, index) => (
              <TableRow key={index} hover>
                <TableCell colSpan={4} align="left" sx={{ px: 0, textTransform: 'capitalize' }}>
                  <Box display="flex" alignItems="center">
                    <Paragraph sx={{ m: 0, ml: 4 }}>{room.room_id}</Paragraph>
                  </Box>
                </TableCell>

                <TableCell align="left" colSpan={2} sx={{ px: 0, textTransform: 'capitalize' }}>
                  ${room.price}
                </TableCell>

                <TableCell sx={{ px: 0 }} align="left" colSpan={2}>
                  {room.status}
                </TableCell>

                <TableCell sx={{ px: 0 }} colSpan={1}>
                  {room.slot}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </ProductTable>
      </Box>
    </Card>
  );
};


export default TopSellingTable;
