import {
  ArrowRightIcon,
  ArrowUpIcon,
  ChatIcon,
  EmailIcon,
  RepeatClockIcon,
} from "@chakra-ui/icons";
import { Grid, GridItem } from "@chakra-ui/react";
import React from "react";
import MainMenuCard from "../../component/MainMenuCard";
import CreateQuoteCard from "../../component/CreateQuoteCard";
import QuickQuoteTable from "../../component/QuickQuoteTable";

const Home = () => {
  return (
    <Grid
      h="100vh"
      w="100%"
      pt={4}
      templateRows="repeat(5, 1fr)"
      templateColumns="repeat(3, 1fr)"
      gap={4}
    >
      <GridItem colSpan={3} bg="tomato" />
      <GridItem>
        <MainMenuCard iconName={ArrowRightIcon} headerText={"Quick quote"}>
          {" "}
          <CreateQuoteCard />
        </MainMenuCard>
      </GridItem>
      <GridItem>
        <MainMenuCard iconName={RepeatClockIcon} headerText={"Pending quotes"}>
          {" "}
          <QuickQuoteTable />
        </MainMenuCard>
      </GridItem>
      <GridItem>
        <MainMenuCard iconName={EmailIcon} headerText={"New Leads"}>
          {" "}
          nice
        </MainMenuCard>
      </GridItem>
      <GridItem colSpan={2}>
        <MainMenuCard
          iconName={ArrowUpIcon}
          headerText={"Popular destinations & packages"}
        >
          {" "}
          nice
        </MainMenuCard>
      </GridItem>
      <GridItem>
        <MainMenuCard iconName={ChatIcon} headerText={"Team chat"}>
          {" "}
          nice
        </MainMenuCard>
      </GridItem>
      <GridItem>
        <MainMenuCard iconName={ChatIcon} headerText={"Team chat"}>
          {" "}
          nice
        </MainMenuCard>
      </GridItem>
      <GridItem>
        <MainMenuCard iconName={ChatIcon} headerText={"Team chat"}>
          {" "}
          nice
        </MainMenuCard>
      </GridItem>
      <GridItem>
        <MainMenuCard iconName={ChatIcon} headerText={"Team chat"}>
          {" "}
          nice
        </MainMenuCard>
      </GridItem>
    </Grid>
  );
};

export default Home;
