import { Checkbox } from "./ui/checkbox";
import { useState, useEffect } from "react";
import React from "react";
import axios from "axios";
import { Box, HStack, Text } from "@chakra-ui/react";
import { ProgressBar, ProgressRoot } from "./ui/progress";
import { MdDelete } from "react-icons/md";

const ChecklistItem = ({ id, deleteChecklistItem, cardId }) => {
  const [items, setItems] = useState([]);
  const [checkedItems, setCheckedItems] = useState({});

  const url = import.meta.env.VITE_URL;
  const treloToken = import.meta.env.VITE_TRELLO_TOKEN;
  const key = import.meta.env.VITE_API_KEY;

  useEffect(() => {
    const getCheckListItem = async () => {
      try {
        const res = await axios.get(
          `${url}/checklists/${id}/checkItems?key=${key}&token=${treloToken}`
        );
        setItems(res.data);

        // Initialize the checked state for each item
        const initialCheckedState = res.data.reduce((acc, item) => {
          acc[item.id] = item.state === "complete";
          return acc;
        }, {});

        setCheckedItems(initialCheckedState);
      } catch (error) {
        console.log("Error fetching checklist items:", error);
      }
    };

    getCheckListItem();
  }, [id, url, key, treloToken]);

  const handleCheckedChange = async (itemId, isChecked) => {
    setCheckedItems((prev) => ({
      ...prev,
      [itemId]: isChecked,
    }));

    try {
      await axios.put(
        `${url}/cards/${cardId}/checklist/${id}/checkItem/${itemId}?key=${key}&token=${treloToken}`,
        {
          state: isChecked ? "complete" : "incomplete",
        }
      );

      setItems((prevItems) =>
        prevItems.map((item) =>
          item.id === itemId
            ? { ...item, state: isChecked ? "complete" : "incomplete" }
            : item
        )
      );
    } catch (error) {
      console.log("Error updating checklist item state:", error);
    }
  };

  const getCheckItemsPercentage = (items) => {
    if (!items.length) return 0;
    let checkItemCount = 0;
    items.forEach((item) => {
      if (item.state === "complete") {
        checkItemCount++;
      }
    });
    return (checkItemCount * 100) / items.length;
  };
  const percent = Math.ceil(getCheckItemsPercentage(items));

  return (
    <>
      <Box>
        <Text>{percent}% complete!</Text>
        <ProgressRoot value={percent}>
          <ProgressBar />
        </ProgressRoot>
        {items.map((item) => (
          <HStack key={item.id}>
            <Checkbox
              checked={checkedItems[item.id] || false}
              onChange={(e) => handleCheckedChange(item.id, e.target.checked)}
            >
              {item.name}
            </Checkbox>
            <MdDelete onClick={() => deleteChecklistItem(id, item.id)} />
          </HStack>
        ))}
      </Box>
    </>
  );
};

export default ChecklistItem;
