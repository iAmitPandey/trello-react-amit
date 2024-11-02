import { Box, Button, Card, HStack, Input, Spinner } from "@chakra-ui/react";
import {
  PopoverBody,
  PopoverContent,
  PopoverRoot,
  PopoverTrigger,
} from "./ui/popover";
import { HiOutlinePlus } from "react-icons/hi";
import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import axios from "axios";

import ChecklistItem from "./ChecklistItem";

const Checklist = ({ name, id }) => {
  const [open, setOpen] = useState(false);
  const [checkList, setCheckList] = useState([]);
  const [checkListName, setCheckListName] = useState("");
  const [addItem, setAddItem] = useState(false);
  const [itemName, setItemName] = useState("");
  const [loading, setLoading] = useState({
    fetch: false,
    create: false,
    deleteChecklist: null,
    deleteItem: null,
    addItem: false,
  });

  const url = import.meta.env.VITE_URL;
  const treloToken = import.meta.env.VITE_TRELLO_TOKEN;
  const key = import.meta.env.VITE_API_KEY;

  const createCheckList = async () => {
    setLoading((prev) => ({ ...prev, create: true }));
    try {
      await axios.post(
        `${url}/cards/${id}/checklists?name=${checkListName}&key=${key}&token=${treloToken}`
      );
      setCheckListName("");
      getCheckList();
    } catch (error) {
      console.log("Error creating checklist", error);
    } finally {
      setLoading((prev) => ({ ...prev, create: false }));
    }
  };

  const getCheckList = async () => {
    setLoading((prev) => ({ ...prev, fetch: true }));
    try {
      const res = await axios.get(
        `${url}/cards/${id}/checklists?key=${key}&token=${treloToken}`
      );
      setCheckList(res.data);
    } catch (error) {
      console.log("Error fetching checklists", error);
    } finally {
      setLoading((prev) => ({ ...prev, fetch: false }));
    }
  };

  const handleOpenChange = () => {
    setOpen((prev) => !prev);
    if (!open) {
      getCheckList();
    }
  };

  const deleteChecklist = async (checklistId) => {
    setLoading((prev) => ({ ...prev, deleteChecklist: checklistId }));
    try {
      await axios.delete(
        `${url}/checklists/${checklistId}?key=${key}&token=${treloToken}`
      );
      getCheckList();
    } catch (error) {
      console.log("Error deleting checklist", error);
    } finally {
      setLoading((prev) => ({ ...prev, deleteChecklist: null }));
    }
  };

  const addItemInChecklist = async (checklistId) => {
    setLoading((prev) => ({ ...prev, addItem: true }));
    try {
      await axios.post(
        `${url}/checklists/${checklistId}/checkItems?name=${itemName}&key=${key}&token=${treloToken}`
      );
      setItemName("");
      getCheckList();
    } catch (error) {
      console.log("Error adding item", error);
    } finally {
      setLoading((prev) => ({ ...prev, addItem: false }));
    }
  };

  const deleteChecklistItem = async (checklistId, itemId) => {
    setLoading((prev) => ({ ...prev, deleteItem: itemId }));
    try {
      await axios.delete(
        `${url}/checklists/${checklistId}/checkItems/${itemId}?key=${key}&token=${treloToken}`
      );
      getCheckList();
    } catch (error) {
      console.log("Error deleting checklist item", error);
    } finally {
      setLoading((prev) => ({ ...prev, deleteItem: null }));
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
          {loading.fetch ? (
            <Spinner size="lg" />
          ) : (
            checkList?.map((list) => (
              <Box key={list.id}>
                <HStack>
                  <Card.Root>
                    <Card.Title>
                      {list.name}
                      <Button
                        onClick={() => deleteChecklist(list.id)}
                        isLoading={loading.deleteChecklist === list.id}
                      >
                        <MdDelete />
                      </Button>
                    </Card.Title>

                    {addItem ? (
                      <Card.Body>
                        <ChecklistItem
                          id={list.id}
                          cardId={id}
                          deleteChecklistItem={deleteChecklistItem}
                        />
                        <Input
                          placeholder="Enter an item"
                          value={itemName}
                          onChange={(e) => setItemName(e.target.value)}
                          size="sm"
                          mb="2"
                        />
                        <Button
                          onClick={() => addItemInChecklist(list.id)}
                          isLoading={loading.addItem}
                        >
                          Add
                        </Button>
                      </Card.Body>
                    ) : (
                      <Card.Body>
                        <ChecklistItem
                          id={list.id}
                          cardId={id}
                          deleteChecklistItem={deleteChecklistItem}
                        />
                        <Button onClick={() => setAddItem(true)}>
                          Add an item
                        </Button>
                      </Card.Body>
                    )}
                  </Card.Root>
                </HStack>
              </Box>
            ))
          )}

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
              isLoading={loading.create}
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
