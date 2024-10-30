import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <>
      <ul
        style={{
          backgroundColor: "var(--ds-surface, #000000)",
          color: "#FFFFFF",
          display: "flex",
          justifyContent: "center",
          height: "60px",
          alignItems: "center",
        }}
      >
        <li>
          <Link to={"/"}>
            <p>Trelo</p>
          </Link>
        </li>
      </ul>
    </>
  );
};

export default Header;
