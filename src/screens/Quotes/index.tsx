import { Grid, GridItem } from "@chakra-ui/react";
import React from "react";
import AllQuoteTable from "../../component/AllQuoteTable";

const Quotes = () => {
  return (
    <Grid
      h="100vh"
      w="100%"
      pt={4}
      templateRows="repeat(4, 1fr)"
      templateColumns="repeat(3, 1fr)"
      gap={4}
    >
      <GridItem colSpan={3} rowSpan={4}>
        <AllQuoteTable />
      </GridItem>
    </Grid>
  );
};

export default Quotes;
