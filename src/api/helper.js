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
