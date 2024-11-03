import React, { useEffect, useState } from "react";
import { Card, Button, Input, Box, HStack } from "@chakra-ui/react";
import { HiOutlinePlus } from "react-icons/hi";
import { FaPlus } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

import CheckListWindow from "./CheckLists";
import { fetchCards, createCard, removeCard } from "../api/helper";

const GetCards = ({ list }) => {
  const [cards, setCards] = useState([]);
  const [cardName, setCardName] = useState("");
  const [createACard, setCreateAcard] = useState(false);

  useEffect(() => {
    const loadCards = async () => {
      try {
        const data = await fetchCards(list.id);
        setCards(data);
      } catch (error) {
        console.log("Error loading cards", error);
      }
    };
    loadCards();
  }, []);

  const addACard = async () => {
    try {
      await createCard(list.id, cardName);
      setCardName("");
      const updatedCards = await fetchCards(list.id);
      setCards(updatedCards);
    } catch (error) {
      console.log("Error creating a new card", error);
    }
  };

  const deleteCard = async (id) => {
    try {
      await removeCard(id);
      setCards((prev) => prev.filter((card) => card.id !== id));
    } catch (error) {
      console.log("Error deleting card", error);
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
