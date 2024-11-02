import React, { useEffect, useState } from "react";
import { Card, Button, Input, Box, HStack } from "@chakra-ui/react";
import { HiOutlinePlus } from "react-icons/hi";
import { FaPlus } from "react-icons/fa";
import CheckListWindow from "./CheckLists";
import axios from "axios";
import { MdDelete } from "react-icons/md";

const GetCards = ({ list }) => {
  const [cards, setCards] = useState([]);
  const [cardName, setCardName] = useState("");
  const [createACard, setCreateAcard] = useState(false);
  const [check, setCheck] = useState(false);
  const url = import.meta.env.VITE_URL;
  const trelloToken = import.meta.env.VITE_TRELLO_TOKEN;
  const key = import.meta.env.VITE_API_KEY;

  useEffect(() => {
    getCards(list.id);
  }, []);

  const getCards = async (id) => {
    try {
      const res = await axios.get(
        `${url}/lists/${id}/cards?key=${key}&token=${trelloToken}`
      );
      setCards(res.data);
    } catch (error) {
      console.log("Error fetching cards", error);
    }
  };

  const addACard = async () => {
    try {
      await axios.post(
        `${url}/cards?idList=${list.id}&name=${cardName}&key=${key}&token=${trelloToken}`
      );
      setCardName("");
      getCards(list.id); // Refresh the list of cards
    } catch (error) {
      console.log("Error creating a new card", error);
    }
  };

  const deleteCard = async (id) => {
    try {
      await axios.delete(`${url}/cards/${id}?key=${key}&token=${trelloToken}`);
      setCards((prev) => prev.filter((card) => card.id !== id));
    } catch (error) {
      console.log("Error in deletion", error);
    }
  };

  return (
    <>
      {cards.map((card) => (
        <Card.Root key={card.id}>
          <HStack>
            <CheckListWindow name={card.name} id={card.id} />
            <Button onClick={() => deleteCard(card.id)}>
              <MdDelete />
            </Button>
          </HStack>
          <Card.Footer></Card.Footer>
        </Card.Root>
      ))}
      {createACard ? (
        <Box mt="2">
          <Input
            placeholder="Enter card name"
            value={cardName}
            onChange={(e) => setCardName(e.target.value)}
            size="sm"
            mb="2"
          />
          <Button
            onClick={() => {
              addACard();
              setCreateAcard(false);
            }}
            colorScheme="blue"
            size="sm"
            leftIcon={<HiOutlinePlus />}
          >
            Add Card
          </Button>
        </Box>
      ) : (
        <Button
          onClick={() => setCreateAcard(true)}
          colorScheme="blue"
          size="sm"
          leftIcon={<HiOutlinePlus />}
        >
          <FaPlus />
          Add Card
        </Button>
      )}
    </>
  );
};

export default GetCards;
