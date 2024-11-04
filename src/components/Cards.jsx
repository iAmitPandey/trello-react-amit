import React from "react";
import { Button, Card } from "@chakra-ui/react";
import { MdDelete } from "react-icons/md";
import GetCards from "./GetCards";

const Cards = ({ list, handleArchiveList }) => {
  return (
    <Card.Root
      maxW="sm"
      overflow="hidden"
      style={{
        backgroundColor: "#242f42",
        border: "none",
        margin: "10px",
        color: "white",
      }}
    >
      <Card.Title style={{ margin: "8px" }}>
        {list.name}
        <Button
          onClick={() => handleArchiveList(list.id)}
          colorScheme="red"
          size="xs"
          ml="2"
        >
          <MdDelete />
        </Button>
      </Card.Title>
      <Card.Body gap="2">
        <GetCards list={list} />
      </Card.Body>
    </Card.Root>
  );
};

export default Cards;
