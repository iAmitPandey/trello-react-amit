import { Checkbox } from "./ui/checkbox";
import { useState, useEffect } from "react";
import React from "react";
import axios from "axios";

const ChecklistItem = ({ id }) => {
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
          acc[item.id] = item.state === "complete" || false;
          return acc;
        }, {});

        setCheckedItems(initialCheckedState);
      } catch (error) {
        console.log("Error fetching checklist items:", error);
      }
    };

    getCheckListItem();
  }, [id]);

  const handleCheckedChange = (itemId, isChecked) => {
    setCheckedItems((prev) => ({
      ...prev,
      [itemId]: isChecked,
    }));
  };

  return (
    <>
      {items.map((item) => (
        <Checkbox
          key={item.id}
          onClick={checkedItems[item.id] || false}
          onCheckedChange={(e) =>
            handleCheckedChange(item.id, e.target.checked)
          }
        >
          {item.name}
        </Checkbox>
      ))}
    </>
  );
};

export default ChecklistItem;
