import React, { useEffect, useState } from "react";
import axios from "axios";
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
} from "@chakra-ui/react";
import GetCards from "../components/GetCards";
import { MdOutlineCancel } from "react-icons/md";
import { FaPlus } from "react-icons/fa";

const SingleBoardPage = () => {
  const [board, setBoard] = useState(null);
  const [lists, setLists] = useState([]);
  const [addList, setAddList] = useState(false);
  const [listName, setListName] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { id } = useParams();
  const url = import.meta.env.VITE_URL;
  const trelloToken = import.meta.env.VITE_TRELLO_TOKEN;
  const key = import.meta.env.VITE_API_KEY;

  const getBoard = async () => {
    try {
      const res = await axios.get(
        `${url}/boards/${id}?key=${key}&token=${trelloToken}`
      );
      setBoard(res.data);
    } catch (error) {
      setError("Failed to fetch board data.");
    }
  };

  const getList = async () => {
    try {
      const res = await axios.get(
        `${url}/boards/${id}/lists?key=${key}&token=${trelloToken}`
      );
      setLists(res.data);
    } catch (error) {
      setError("Failed to fetch lists.");
    }
  };

  const createAList = async () => {
    try {
      await axios.post(
        `${url}/lists?name=${listName}&idBoard=${id}&key=${key}&token=${trelloToken}`
      );
      setListName("");
      getList();
    } catch (error) {
      setError("Error creating list.");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await getBoard();
      await getList();
      setLoading(false);
    };
    fetchData();
  }, []);

  const archiveList = async (listId) => {
    try {
      await axios.put(
        `${url}/lists/${listId}/closed?value=true&key=${key}&token=${trelloToken}`
      );
      setLists((prevLists) => prevLists.filter((list) => list.id !== listId));
    } catch (error) {
      setError("Error archiving list.");
    }
  };

  if (loading) return <Spinner color="blue.500" size="xl" />;
  if (error) return <Text color="red.500">{error}</Text>;

  return (
    <>
      <Card.Root>
        <Card.Title>{board?.name}</Card.Title>
      </Card.Root>
      {lists?.map((list) => (
        <Card.Root maxW="sm" overflow="hidden" key={list.id}>
          <Card.Title>
            {list.name}
            <Button
              onClick={() => archiveList(list.id)}
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
              onClick={createAList}
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
