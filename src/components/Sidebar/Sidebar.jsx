import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import VideoCard from "../VideoCard/VideoCard";
import styles from "./Sidebar.module.css";
import { BsSearch } from "react-icons/bs";

function Sidebar() {
  const navigate = useNavigate();
  const [text, setText] = useState("");
  const [keyword, setKeyword] = useState("");
  const handleChange = (e) => {
    setText(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setKeyword(text);
    setText("");
  };

  return (
    <div className={styles.sidebar}>
      <Link to="/" className={styles.logo}>
        <img src="/logo3.png" />
      </Link>
      <form className={styles.search} onSubmit={handleSubmit}>
        <input type="text" onChange={handleChange} value={text} />
        <button>
          <BsSearch size={15} className={styles.searchButton} />
        </button>
      </form>
      <VideoCard keyword={keyword} />
    </div>
  );
}

export default Sidebar;
