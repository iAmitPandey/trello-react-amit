import React, { useEffect, useState } from "react";
import { fetchBoard, fetchLists, createList, archiveList } from "../api/helper";
import { useParams } from "react-router-dom";
import { MdDelete } from "react-icons/md";

import {
  Card,
  Button,
  Box,
  Input,
  Flex,
  Spinner,
  Text,
  HStack,
} from "@chakra-ui/react";
import { MdOutlineCancel } from "react-icons/md";
import { FaPlus } from "react-icons/fa";

import Cards from "../components/Cards";

const SingleBoardPage = () => {
  const [board, setBoard] = useState(null);
  const [lists, setLists] = useState([]);
  const [addList, setAddList] = useState(false);
  const [listName, setListName] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { id } = useParams();

  const handleCreateList = async () => {
    try {
      await createList(id, listName);
      setListName("");
      const updatedLists = await fetchLists(id);
      setLists(updatedLists.data);
    } catch (error) {
      setError("Error creating list.");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const boardResponse = await fetchBoard(id);
        setBoard(boardResponse.data);

        const listsResponse = await fetchLists(id);
        setLists(listsResponse.data);
      } catch (error) {
        setError("Failed to fetch board data.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleArchiveList = async (listId) => {
    try {
      await archiveList(listId);
      setLists((prevLists) => prevLists.filter((list) => list.id !== listId));
    } catch (error) {
      setError("Error archiving list.");
    }
  };

  if (loading) return <Spinner color="blue.500" size="xl" />;
  if (error) return <Text color="red.500">{error}</Text>;

  return (
    <>
      <HStack
        style={{
          backgroundColor: "#242f42",
          color: "white",
          marginBottom: "16px",
        }}
      >
        <Box>{board?.name}</Box>
      </HStack>
      {lists?.map((list) => (
        <Cards
          key={list.id}
          list={list}
          handleArchiveList={handleArchiveList}
        />
      ))}
      {addList ? (
        <Box
          minW="300px"
          bg="gray.900"
          borderRadius="md"
          p="1"
          color="whiteAlpha.900"
          bgColor="rgb(16, 18, 4)"
        >
          <Input
            placeholder="Enter list name"
            value={listName}
            onChange={(e) => setListName(e.target.value)}
            color="whiteAlpha.800"
            size="sm"
            mb="2"
          />
          <Flex justify="flex-start">
            <Button
              onClick={handleCreateList}
              colorScheme="blue"
              bg="rgb(87, 157, 255)"
              size="xs"
              mr="2"
              color="black"
            >
              Add List
            </Button>
            <Button
              onClick={() => {
                setAddList(false);
                setListName("");
              }}
              size="xs"
              bg="rgb(16, 18, 4)"
            >
              <MdOutlineCancel />
            </Button>
          </Flex>
        </Box>
      ) : (
        <Button
          onClick={() => setAddList(true)}
          minW="300px"
          p={3}
          color="whiteAlpha.900"
          bg="rgba(255, 255, 255, 0.24)"
          borderRadius="10px"
          transition="transform 0.2s, box-shadow 0.2s"
          _hover={{ bg: "rgba(255, 255, 255, 0.20)" }}
          justifyContent="flex-start"
        >
          <FaPlus />
          Add another list
        </Button>
      )}
    </>
  );
};

export default SingleBoardPage;
