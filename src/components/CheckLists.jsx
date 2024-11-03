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

import ChecklistItem from "./ChecklistItem";
import {
  createChecklist,
  fetchChecklists,
  deleteChecklist,
  addItemToChecklist,
  deleteChecklistItem,
} from "../api/helper";

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

  const createCheckList = async () => {
    setLoading((prev) => ({ ...prev, create: true }));
    try {
      await createChecklist(id, checkListName);
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
      const data = await fetchChecklists(id);
      setCheckList(data);
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

  const deleteChecklistHandler = async (checklistId) => {
    setLoading((prev) => ({ ...prev, deleteChecklist: checklistId }));
    try {
      await deleteChecklist(checklistId);
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
      await addItemToChecklist(checklistId, itemName);
      setItemName("");
      getCheckList();
    } catch (error) {
      console.log("Error adding item", error);
    } finally {
      setLoading((prev) => ({ ...prev, addItem: false }));
    }
  };

  const deleteChecklistItemHandler = async (checklistId, itemId) => {
    setLoading((prev) => ({ ...prev, deleteItem: itemId }));
    try {
      await deleteChecklistItem(checklistId, itemId);
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
                        onClick={() => deleteChecklistHandler(list.id)}
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
                          deleteChecklistItem={deleteChecklistItemHandler}
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
                          deleteChecklistItem={deleteChecklistItemHandler}
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
