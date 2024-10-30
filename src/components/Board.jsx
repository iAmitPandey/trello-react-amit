import React from "react";
import { SimpleGrid, Card } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const Board = ({ boards }) => {
  console.log(boards);
  return (
    <SimpleGrid column={4} minChildWidth="300px" gap="10px" ml="80px">
      <Card.Root w="300px" h="150px" bgColor={"gray.700"} color={"white"}>
        <Card.Title>Create new board</Card.Title>
        {boards?.map(
          (board) =>
            !board.closed && (
              <Link key={board.id} to={`/boards/${board.id}`}>
                <Card.Root>{board.name}</Card.Root>
              </Link>
            )
        )}
      </Card.Root>
    </SimpleGrid>
  );
};

export default Board;
/*

<SimpleGrid column={4} minChildWidth="300px" gap="10px" ml="80px">
        <Card.Root w="300px" h="150px" bgColor={"gray.700"} color={"white"}>
          <Card.Title>Create new board</Card.Title>
        </Card.Root>
        {allBoards.map((curr, i) => (
          <Link key={i} to={/boards/${curr.id}}>
            <Card.Root w="300px" h="150px">
              <Card.Title mt="2">{curr.name}</Card.Title>
            </Card.Root>
          </Link>
        ))}
      </SimpleGrid>

*/
