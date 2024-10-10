import React from "react";
import styles from "./searchPanel.module.scss";
import SearchIcon from "shared/assets/SearchIcon";
import SortIcon from "shared/assets/SortIcon";
import { Input } from "@components/shadowCDN/input";

const SearchPanel = () => {
  return (
    <div className={styles.wrapper}>
      <div className={"flex items-center gap-2"}>
        <SearchIcon />
        <Input
          id="outlined-basic"
          placeholder="Search"
        />
      </div>
      <div className={"flex items-center gap-2"}>
        <SortIcon />
        <div>sort</div>
      </div>
    </div>
  );
};

export default SearchPanel;
