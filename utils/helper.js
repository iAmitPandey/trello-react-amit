const url = import.meta.env.VITE_URL;
const trelloToken = import.meta.env.VITE_TRELLO_TOKEN;
const key = import.meta.env.VITE_API_KEY;

export const fetchAllBoards = ` ${url}/members/me/boards?key=${key}&token=${trelloToken}`;
