import { Box, styled } from "@mui/material";
import { Breadcrumb, SimpleCard } from "app/components";
import PaginationTable from "./PaginationTable";

const Container = styled("div")(({ theme }) => ({
  margin: "30px",
  [theme.breakpoints.down("sm")]: { margin: "16px" },
  "& .breadcrumb": {
    marginBottom: "30px",
    [theme.breakpoints.down("sm")]: { marginBottom: "16px" },
  },
}));

const AppTable = (props) => {
  const {type, dataList} = props;
  return (
    <Container>
      <Box className="breadcrumb">
        <Breadcrumb routeSegments={[{ name: `${type}`, path: `/${type}/list` }, { name: "Table" }]} />
      </Box>
      <SimpleCard title="List">
        <PaginationTable dataList={dataList} type={type} />
      </SimpleCard>
    </Container>
  );
};

export default AppTable;
