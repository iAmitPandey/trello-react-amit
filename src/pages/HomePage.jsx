import React, { useState, useEffect } from "react";
import "../App.css";
import axios from "axios";
import Board from "../components/Board";

const HomePage = () => {
  const [boards, setBoards] = useState(null);

  const url = import.meta.env.VITE_URL;
  const treloToken = import.meta.env.VITE_TRELLO_TOKEN;
  const key = import.meta.env.VITE_API_KEY;
  const fetchData = async () => {
    const res = await axios.get(
      `${url}/members/me/boards?key=${key}&token=${treloToken}`
    );
    const data = res.data;
    setBoards(data);
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div>
      <Board boards={boards} />
    </div>
  );
};

export default HomePage;
