import React, { useState } from "react";
import { SimpleGrid, Card } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import NewCard from "./NewCard";

const Board = ({ boards }) => {
  return (
    <SimpleGrid column={4} minChildWidth="300px" gap="10px" ml="80px">
      {boards?.map(
        (board, id) =>
          !board.closed && (
            <Link key={board.id} to={`/boards/${board.id}`}>
              <Card.Root>
                <Card.Title>{board.name}</Card.Title>
              </Card.Root>
            </Link>
          )
      )}
    </SimpleGrid>
  );
};

export default Board;
