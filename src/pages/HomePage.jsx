import React, { useState, useEffect } from "react";
import NewCard from "../components/NewCard";
import Board from "../components/Board";
import "../App.css";

import { Spinner, Box } from "@chakra-ui/react";
import { fetchAllBoards, createBoard } from "../api/helper";

const HomePage = () => {
  const [boards, setBoards] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    try {
      const data = await fetchAllBoards();
      setBoards(data);
    } catch (err) {
      console.log("Failed to fetch boards:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleCreateBoard = async (name) => {
    try {
      const newBoard = await createBoard(name);
      setBoards((prev) => [...prev, newBoard]);
    } catch (err) {
      console.log("Failed to create board:", err);
    }
  };

  return (
    <div>
      {loading ? (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="100vh"
        >
          <Spinner size="xl" color="blue.500" />
        </Box>
      ) : (
        <>
          <Board boards={boards} />

          <NewCard creatBoard={handleCreateBoard} />
        </>
      )}
    </div>
  );
};

export default HomePage;
