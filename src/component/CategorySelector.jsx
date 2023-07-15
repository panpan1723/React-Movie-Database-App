import React from "react";
import { CATEGORIES } from "../constants";
import { Select, MenuItem } from "@material-ui/core";

export default function CategorySelect(props) {
  const handleChange = (e) => {
    props.setCategory(e.target.value);
  };
  return (
    <Select
      value={props.category}
      onChange={handleChange}
      className={props.className}
    >
      {CATEGORIES.map((category) => {
        return (
          <MenuItem key={category.id} value={category.id}>
            {category.title}
          </MenuItem>
        );
      })}
    </Select>
  );
}
