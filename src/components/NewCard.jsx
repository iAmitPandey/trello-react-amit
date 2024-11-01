import React, { useState } from "react";
import {
  PopoverBody,
  PopoverContent,
  PopoverRoot,
  PopoverTitle,
  PopoverTrigger,
} from "../components/ui/popover";
import { Input, Button } from "@chakra-ui/react";

const CreateBoardPopover = ({ creatBoard, name }) => {
  const [boardName, setBoardName] = useState("");

  const handleClick = (e) => {
    e.preventDefault();
    if (boardName.trim()) {
      creatBoard(boardName);
      setBoardName("");
    }
  };

  return (
    <PopoverRoot>
      <PopoverTrigger asChild>
        <Button>{name}</Button>
      </PopoverTrigger>
      <PopoverContent>
        <PopoverBody>
          <PopoverTitle>{name}</PopoverTitle>
          <form onSubmit={handleClick}>
            <Input
              placeholder="Enter board name"
              value={boardName}
              onChange={(e) => setBoardName(e.target.value)}
              mb={4}
            />
          </form>
          <Button colorScheme="gray.700" onClick={handleClick}>
            Create
          </Button>
        </PopoverBody>
      </PopoverContent>
    </PopoverRoot>
  );
};

export default CreateBoardPopover;
