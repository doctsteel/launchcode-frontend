import styled from "styled-components";
import React from "react";
import { HStack, Icon } from "@chakra-ui/react";
import { ArrowRightIcon } from "@chakra-ui/icons";

type CardProps = {
  children: any[];
  iconName: any;
  headerText: string;
};

const CardStyled = styled.div`
  background-color: white;
  width: 100%;
  height: 100%;
  border-radius: 10px;
  border-width: 2px;
  border-color: #e6e6e6;
  padding: 20px;
`;

const CardHeaderTextStyled = styled.h2`
  color: #5f6caf;
  font-size: 20px;
`;

const MainMenuCard = ({
  children,
  iconName,
  headerText,
}: CardProps): React.ReactElement => {
  return (
    <CardStyled>
      <HStack borderBottom="1px" borderColor="#e6e6e6">
        <Icon as={iconName} color="#5bbfba" />
        <CardHeaderTextStyled>{headerText}</CardHeaderTextStyled>
      </HStack>
      {children}
    </CardStyled>
  );
};

export default MainMenuCard;
