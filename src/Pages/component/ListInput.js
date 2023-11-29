import React, { useState } from "react";
import "./Inputs.css";
import addIcon from "../assets/add.svg";
import removeIcon from "../assets/close.svg";

export default function ListInput(props) {
  const [textBox, setTextBox] = useState("");

  const handleTextBoxChange = (e) => {
    setTextBox(e.target.value);
  };

  const addItem = () => {
    console.log(props.list);
    props.action(props.listName, [...props.list, textBox]);
    setTextBox("");
  };

  const removeItem = (index) => {
    const updatedList = props.list;
    updatedList.splice(index, 1);
    props.action(props.listName, updatedList);
  };

  const removeAll = () => {
    props.action(props.listName, []);
  };

  const InputItem = (
    <div className="field" id="input-title">
      <div>
        <input className="input-empty" type="text" value={textBox} onChange={(e) => handleTextBoxChange(e)} />
      </div>
      <img
        type="button"
        value={textBox}
        name={props.listName}
        id={props.listName}
        onClick={() => addItem()}
        src={addIcon}
        className="App-icon"
        alt="icon"
      />
    </div>
  );

  const ListItem = (
    <div className="input-items-list">
      {props.list.map((item, index) => (
        <div className="field" id="input-item" key={index}>
          {item}
          <img src={removeIcon} className="App-icon" id="action-icon" alt="icon" onClick={() => removeItem()} />
        </div>
      ))}
      {props.list.length > 2 && (
        <div className="field" id="action-icon" onClick={() => removeAll()}>
          Remove All Items
        </div>
      )}
    </div>
  );

  return (
    <div>
      {InputItem}
      {props.list.length > 0 && ListItem}
    </div>
  );
}
