import React from "react";
import { Card, HStack } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const Board = ({ boards }) => {
  return (
    <HStack>
      {boards?.map(
        (board) =>
          !board.closed && (
            <Link key={board.id} to={`/boards/${board.id}`}>
              <Card.Root
                size="lg"
                width="180px"
                backgroundColor="black"
                color="white"
                textAlign="center"
                height="160px"
                border="none"
                justifyContent="center"
                margin="10px"
              >
                <Card.Title>{board.name}</Card.Title>
              </Card.Root>
            </Link>
          )
      )}
    </HStack>
  );
};

export default Board;
