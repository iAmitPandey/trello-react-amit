import { Box, Button, Card, HStack, Input } from "@chakra-ui/react";
import {
  PopoverBody,
  PopoverContent,
  PopoverRoot,
  PopoverTrigger,
} from "./ui/popover";
import { HiOutlinePlus } from "react-icons/hi";
import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import axios from "axios";
import { MdDelete } from "react-icons/md";
import ChecklistItem from "./ChecklistItem";

const Checklist = ({ name, id }) => {
  const [open, setOpen] = useState(false);
  const [checkList, setCheckList] = useState([]);
  const [checkListName, setCheckListName] = useState("");
  // const [items, setItems] = useState([]);
  const [addItem, setAddItem] = useState(false);

  // useEffect(() => {
  //   getCheckListItem();
  // }, []);

  const url = import.meta.env.VITE_URL;
  const treloToken = import.meta.env.VITE_TRELLO_TOKEN;
  const key = import.meta.env.VITE_API_KEY;

  const createCheckList = async () => {
    try {
      await axios.post(
        `${url}/cards/${id}/checklists?name=${checkListName}&key=${key}&token=${treloToken}`
      );
      setCheckListName("");
      getCheckList();
    } catch (error) {
      console.log("Error creating checklist", error);
    }
  };

  const getCheckList = async () => {
    try {
      const res = await axios.get(
        `${url}/cards/${id}/checklists?key=${key}&token=${treloToken}`
      );
      setCheckList(res.data);
    } catch (error) {
      console.log("Error fetching checklists", error);
    }
  };

  const handleOpenChange = () => {
    setOpen((prev) => !prev);
    if (!open) {
      getCheckList();
    }
  };

  const deleteChecklist = async (id) => {
    try {
      await axios.delete(
        `${url}/checklists/${id}?key=${key}&token=${treloToken}`
      );
      getCheckList();
    } catch (error) {
      console.log(error);
    }
  };

  const addItemInChecklist = async (id, name) => {
    try {
      const res = await axios.post(
        `${url}/checklists/${id}/checkItems?name=${name}&key=${key}&token=${treloToken}`
        //cards/${cardId}/checkItem/${checkItemId}?key=${apikey}&token=${apiToken}&state=${state}
      );
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  // const getCheckListItem = async () => {
  //   try {
  //     const res = await axios.get(
  //       `${url}/checklists/${id}/checkItems?key=${key}&token=${treloToken}`

  //     );
  //     setItems(res);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const deleteChecklistItem = async (id, itemId) => {
    try {
      await axios.delete(
        `${url}/checklists/${id}/checkItems/${itemId}?key=${key}&token=${treloToken}`
      );
      // getCheckListItem();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <PopoverRoot open={open} onOpenChange={handleOpenChange}>
      <PopoverTrigger asChild>
        <Button size="sm" variant="outline">
          {name}
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <PopoverBody>
          {checkList?.map((listItem) => (
            <Box key={listItem.id}>
              <HStack>
                <Card.Root>
                  <Card.Title>
                    {listItem.name}
                    <Button onClick={() => deleteChecklist(listItem.id)}>
                      <MdDelete />
                    </Button>
                  </Card.Title>

                  {addItem ? (
                    <Card.Body>
                      <ChecklistItem id={listItem.id} />
                      <Button onClick={() => setAddItem(false)}>
                        Add an item
                      </Button>
                    </Card.Body>
                  ) : (
                    <Button onClick={() => setAddItem(true)}>
                      Add an item
                    </Button>
                  )}
                </Card.Root>
              </HStack>
            </Box>
          ))}
          <Box mt="2">
            <Input
              placeholder="Enter checklist name"
              value={checkListName}
              onChange={(e) => setCheckListName(e.target.value)}
              size="sm"
              mb="2"
            />
            <Button
              onClick={createCheckList}
              colorScheme="blue"
              size="sm"
              leftIcon={<HiOutlinePlus />}
            >
              <FaPlus />
              Add a checklist
            </Button>
          </Box>
        </PopoverBody>
      </PopoverContent>
    </PopoverRoot>
  );
};

export default Checklist;
