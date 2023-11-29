import React, { useState } from "react";
import "./Inputs.css";
import dropdownIcon from "../assets/dropdown.svg";

export default function DropDownMenu(props) {
  const [dropdown, setDropdown] = useState(false);

  const updateDropDown = () => {
    setDropdown(!dropdown);
  };

  const action = (name, value) => {
    props.action(name, value);
    updateDropDown();
  };

  function getFileName(name) {
    const lowercaseName = name.toLowerCase();
    const File = props.arr.find((c) => c.name.toLowerCase() === lowercaseName);
    return File ? File.fileName : null;
  }

  const flag = getFileName(props.value);

  const DropdownTitle = (
    <div className="field" id="dropdown-title" onClick={updateDropDown}>
      <div className="title-flag-container">
        <img src={flag} className="flag-icon" alt="icon" />
        {props.value}
      </div>
      <img
        src={dropdownIcon}
        className="App-icon"
        id={`dropdown-icon-${dropdown ? "activated" : "deactivated"}`}
        alt="icon"
      />
    </div>
  );

  const DropDownList = (
    <div className="dropdown-list" id={`dropdown-list-${dropdown ? "activated" : "deactivated"}`}>
      {props.arr.map((item, index) => (
        <div key={index} className="dropdown-item" onClick={(e) => action(props.name, item.name)}>
          <img src={item.fileName} className="flag-icon" alt="icon" />
          {item.name}
        </div>
      ))}
    </div>
  );

  return (
    <div>
      {DropdownTitle}
      {DropDownList}
    </div>
  );
}
