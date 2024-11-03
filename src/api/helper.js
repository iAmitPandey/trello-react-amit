import axios from "axios";

const url = import.meta.env.VITE_URL;
const trelloToken = import.meta.env.VITE_TRELLO_TOKEN;
const key = import.meta.env.VITE_API_KEY;

export const fetchAllBoards = async () => {
  const res = await axios.get(
    `${url}/members/me/boards?key=${key}&token=${trelloToken}`
  );
  return res.data;
};

export const createBoard = async (name) => {
  const res = await axios.post(
    `${url}/boards/?name=${encodeURIComponent(
      name
    )}&key=${key}&token=${trelloToken}`
  );
  return res.data;
};

export const fetchBoard = async (id) => {
  return await axios.get(`${url}/boards/${id}?key=${key}&token=${trelloToken}`);
};

export const fetchLists = async (boardId) => {
  return await axios.get(
    `${url}/boards/${boardId}/lists?key=${key}&token=${trelloToken}`
  );
};

export const createList = async (boardId, listName) => {
  return await axios.post(
    `${url}/lists?name=${listName}&idBoard=${boardId}&key=${key}&token=${trelloToken}`
  );
};

export const archiveList = async (listId) => {
  return await axios.put(
    `${url}/lists/${listId}/closed?value=true&key=${key}&token=${trelloToken}`
  );
};

//

export const fetchCards = async (listId) => {
  try {
    const res = await axios.get(
      `${url}/lists/${listId}/cards?key=${key}&token=${trelloToken}`
    );
    return res.data;
  } catch (error) {
    console.error("Error fetching cards:", error);
    throw error;
  }
};

export const createCard = async (listId, name) => {
  try {
    await axios.post(
      `${url}/cards?idList=${listId}&name=${name}&key=${key}&token=${trelloToken}`
    );
  } catch (error) {
    console.error("Error creating a new card:", error);
    throw error;
  }
};

export const removeCard = async (cardId) => {
  try {
    await axios.delete(
      `${url}/cards/${cardId}?key=${key}&token=${trelloToken}`
    );
  } catch (error) {
    console.error("Error deleting card:", error);
    throw error;
  }
};

//

export const createChecklist = async (cardId, name) => {
  try {
    await axios.post(
      `${url}/cards/${cardId}/checklists?name=${name}&key=${key}&token=${trelloToken}`
    );
  } catch (error) {
    console.error("Error creating checklist:", error);
    throw error;
  }
};

export const fetchChecklists = async (cardId) => {
  try {
    const res = await axios.get(
      `${url}/cards/${cardId}/checklists?key=${key}&token=${trelloToken}`
    );
    return res.data;
  } catch (error) {
    console.error("Error fetching checklists:", error);
    throw error;
  }
};

export const deleteChecklist = async (checklistId) => {
  try {
    await axios.delete(
      `${url}/checklists/${checklistId}?key=${key}&token=${trelloToken}`
    );
  } catch (error) {
    console.error("Error deleting checklist:", error);
    throw error;
  }
};

export const addItemToChecklist = async (checklistId, itemName) => {
  try {
    await axios.post(
      `${url}/checklists/${checklistId}/checkItems?name=${itemName}&key=${key}&token=${trelloToken}`
    );
  } catch (error) {
    console.error("Error adding item to checklist:", error);
    throw error;
  }
};

export const deleteChecklistItem = async (checklistId, itemId) => {
  try {
    await axios.delete(
      `${url}/checklists/${checklistId}/checkItems/${itemId}?key=${key}&token=${trelloToken}`
    );
  } catch (error) {
    console.error("Error deleting checklist item:", error);
    throw error;
  }
};

//
export const fetchChecklistItems = async (checklistId) => {
  try {
    const res = await axios.get(
      `${url}/checklists/${checklistId}/checkItems?key=${key}&token=${trelloToken}`
    );
    return res.data;
  } catch (error) {
    console.error("Error fetching checklist items:", error);
    throw error;
  }
};

export const updateChecklistItemState = async (
  cardId,
  checklistId,
  itemId,
  state
) => {
  try {
    await axios.put(
      `${url}/cards/${cardId}/checklist/${checklistId}/checkItem/${itemId}?key=${key}&token=${trelloToken}`,
      { state }
    );
  } catch (error) {
    console.error("Error updating checklist item state:", error);
    throw error;
  }
};
