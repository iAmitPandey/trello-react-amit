import React, { useState, useEffect } from "react";
import "../App.css";
import axios from "axios";
import NewCard from "../components/NewCard";
import Board from "../components/Board";
import { fetchAllBoards } from "../../utils/helper";

const HomePage = () => {
  const [boards, setBoards] = useState(null);

  const url = import.meta.env.VITE_URL;
  const trelloToken = import.meta.env.VITE_TRELLO_TOKEN;
  const key = import.meta.env.VITE_API_KEY;

  const fetchData = async () => {
    const res = await axios.get(fetchAllBoards);
    const data = res.data;
    setBoards(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const creatBoard = async (name) => {
    try {
      const res = await axios.post(
        `${url}/boards/?name=${encodeURIComponent(
          name
        )}&key=${key}&token=${trelloToken}`
      );
      setBoards((prev) => [...prev, res.data]);
    } catch (err) {
      console.log("failed to fetch data", err);
    }
  };

  return (
    <div style={{ display: "grid" }}>
      <Board boards={boards} />
      <NewCard creatBoard={creatBoard} />
    </div>
  );
};

export default HomePage;
