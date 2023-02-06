import { SearchIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  ButtonGroup,
  Divider,
  Grid,
  GridItem,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverFooter,
  PopoverHeader,
  PopoverTrigger,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { QueryClient, useQuery, useQueryClient } from "@tanstack/react-query";
import moment from "moment";
import React from "react";
import QuotesService, { Quote } from "../../services/quotes.service";

type ModalProps = {
  quote: Quote;
};

const QuoteDetailsModal = ({ quote }: ModalProps) => {
  const queryClient = useQueryClient();
  const quotesService = new QuotesService();
  const { data, refetch } = useQuery(
    ["deletequote"],
    () => {
      quotesService.deleteQuote(quote.id);
      queryClient.invalidateQueries(["quickquotes"]);
      return "1";
    },
    { enabled: false, refetchOnWindowFocus: false }
  );

  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Button leftIcon={<SearchIcon />} onClick={onOpen} size={"xs"} />
      <Modal isOpen={isOpen} size={"xl"} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            Quote {quote.id + "\n"}
            <Text as="p" fontSize="xs">
              Created at{" "}
              {moment(quote.created_at).format("MM-DD-YYYY, HH:mm:ss")}{" "}
            </Text>
          </ModalHeader>
          <ModalCloseButton />
          <Divider />
          <ModalBody>
            <Grid
              gap={3}
              pt={2}
              templateRows="repeat(5, 1fr)"
              templateColumns="repeat(2, 1fr)   "
            >
              <GridItem colSpan={2}>
                <Text>Trip Details</Text>
              </GridItem>

              <GridItem>
                Departure Date:{" "}
                {moment(quote.departure_date).format("MM-DD-YYYY, HH:mm:ss")}
              </GridItem>
              <GridItem>From: {quote.departure_loc}</GridItem>
              <GridItem>
                Return Date:{" "}
                {moment(quote.return_date).format("MM-DD-YYYY, HH:mm:ss")}
              </GridItem>
              <GridItem>To: {quote.destination_loc}</GridItem>
              <GridItem>Transport method: {quote.transportation}</GridItem>
              <GridItem>Number of travelers: {quote.traveler_qty}</GridItem>
              <GridItem>Quote status: {quote.status}</GridItem>
              <GridItem>Price: {quote.price}</GridItem>
            </Grid>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>

            <Button
              colorScheme="red"
              onClick={(e) => {
                refetch();
                onClose();
              }}
            >
              Delete
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default QuoteDetailsModal;
