import { useState, useEffect } from "react";
import { Checkbox } from "./ui/checkbox";
import { Box, HStack, Text } from "@chakra-ui/react";
import { ProgressBar, ProgressRoot } from "./ui/progress";
import { MdDelete } from "react-icons/md";

import { fetchChecklistItems, updateChecklistItemState } from "../api/helper";

const ChecklistItem = ({ id, deleteChecklistItem, cardId }) => {
  const [items, setItems] = useState([]);
  const [checkedItems, setCheckedItems] = useState({});

  useEffect(() => {
    const getChecklistItems = async () => {
      try {
        const data = await fetchChecklistItems(id);
        setItems(data);

        const initialCheckedState = data.reduce((acc, item) => {
          acc[item.id] = item.state === "complete";
          return acc;
        }, {});

        setCheckedItems(initialCheckedState);
      } catch (error) {
        console.log("Error fetching checklist items:", error);
      }
    };

    getChecklistItems();
  }, []);

  const handleCheckedChange = async (itemId, isChecked) => {
    setCheckedItems((prev) => ({
      ...prev,
      [itemId]: isChecked,
    }));

    try {
      await updateChecklistItemState(
        cardId,
        id,
        itemId,
        isChecked ? "complete" : "incomplete"
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
    const checkItemCount = items.filter(
      (item) => item.state === "complete"
    ).length;
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
