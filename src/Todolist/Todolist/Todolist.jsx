import React, { useEffect, useState, useRef } from "react";
import "./TodoList.css";
import "./ListItems.jsx";
import ListItems from "./ListItems.jsx";
import CompletedItems from "./CompletedItems.jsx";

function AddTodoItem() {
  const [inputtext, setInput] = useState("");
  const [items, setItems] = useState([]);
  const inputRef = useRef();
  const selectedItems = useRef([]);
  const [completedItems, setcompletedItems] = useState([]);

  useEffect(() => {
    inputRef.current.focus();
    if(localStorage.items){
      setItems(JSON.parse(localStorage.items));
    }
    if(localStorage.completedItems){
    setcompletedItems(JSON.parse(localStorage.completedItems));
    }
  }, []);

  const handleChange = (props) => {
    setInput(props.target.value);
  };

  const clickHandler = () => {
    setItems((item) => [...item, { id: item.length, data: `${inputtext}` }]);
    setInput("");
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  const itemUpdated = (id) => {
    selectedItems.current.push(id);
  };

  const handleDelete = () => {
    selectedItems.current.forEach((element) => {
      completedItems.push(items[element]);
    });

    setcompletedItems(completedItems);
    setItems(items.filter((i) => !completedItems.includes(i)));
    
  };

  const handleSave = () => {
    localStorage.items = JSON.stringify(items);
    localStorage.completedItems = JSON.stringify(completedItems);
  };

  const handleClearhistory = () => {
    localStorage.clear();
    setItems([]);
    setcompletedItems([]);
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <h2>My tasks</h2>
        Enter task:{" "}
        <input
          type="text"
          name="itemInput"
          id="input1"
          value={inputtext}
          onChange={handleChange}
          ref={inputRef}
        />
        &nbsp; &nbsp;
        <input type="submit" value="Submit" onClick={clickHandler} />
        <ul className="uoList">
          {items.map((item) => (
            <ListItems
              key={item.id}
              id={item.id}
              data={item.data}
              itemUpdated={itemUpdated}
            />
          ))}
        </ul>
        <span>Total {items.length} tasks to be completed.</span>
        <br />
        <br />
        <button type="submit" onClick={handleDelete}>
          Move to completed
        </button>
        <br />
        Completed tasks:
        <ul className="cmpList">
          {completedItems.map((completedItem) => (
            <CompletedItems key={completedItem.id} data={completedItem.data} />
          ))}
        </ul>
      </div>
      <br />
      <br />
      <button type="submit" onClick={handleSave}>
          Save all changes
      </button>
      &nbsp;&nbsp;
      <button type="submit" onClick={handleClearhistory}>
          Clear all history
      </button>
    </form>
  );
}

export default AddTodoItem;
