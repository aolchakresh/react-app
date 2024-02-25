import React, { useEffect, useState, useRef } from "react";
import "./TodoList.css";
import "./ListItems.jsx";
import ListItems from "./ListItems.jsx";
import CompletedItems from "./CompletedItems.jsx";
import { AgGridReact } from 'ag-grid-react'; // React Grid Logic
import "ag-grid-community/styles/ag-grid.css"; // Core CSS
import "ag-grid-community/styles/ag-theme-quartz.css"; // Theme
import itemCount from "../Store.jsx";

function AddTodoItem() {
  const [inputtext, setInput] = useState("");
  const [items, setItems] = useState([]);
  const inputRef = useRef();
  const selectedItems = useRef([]);
  const [completedItems, setcompletedItems] = useState([]);
  const [itemCountGlobal, setItemCountGlobal] = useState(itemCount.value);

  // Row Data: The data to be displayed.
  const [rowData, setRowData] = useState([
    { make: "Tesla", model: "Model Y", price: 64950, electric: true },
    { make: "Ford", model: "F-Series", price: 33850, electric: false },
    { make: "Toyota", model: "Corolla", price: 29600, electric: false },
  ]);

  // Column Definitions: Defines & controls grid columns.
  const [colDefs, setColDefs] = useState([
    { field: "make" },
    { field: "model" },
    { field: "price" },
    { field: "electric" },
  ]);

  useEffect(() => {
    itemCount.subscribe((value) => setItemCountGlobal(value));
    itemCount.next(JSON.parse(localStorage.items).length);
    inputRef.current.focus();
    if (localStorage.items) {
      setItems(JSON.parse(localStorage.items));
    }
    if (localStorage.completedItems) {
      setcompletedItems(JSON.parse(localStorage.completedItems));
    }
  }, []);

  const handleChange = (props) => {
    setInput(props.target.value);
    //setItemCountGlobal(items.length);
  };

  const clickHandler = () => {
    setItems((item) => [...item, { id: item.length, data: `${inputtext}` }]);
    setInput("");
  };

  const handleSubmit = (event) => {
    itemCount.next(items.length);
    event.preventDefault();
    localStorage.items = JSON.stringify(items);
    localStorage.completedItems = JSON.stringify(completedItems);
  };

  const itemUpdated = (id) => {
    selectedItems.current.push(id);
  };

  const handleDelete = () => {
    selectedItems.current.forEach((element) => {
      completedItems.push(items[element]);
      itemCount.next(items.length);
      localStorage.items = JSON.stringify(items);
      localStorage.completedItems = JSON.stringify(completedItems);
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
  };

  // const GridExample = () => {
  //   return (<div></div>);
  // }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        {/* <h2>My tasks</h2> */}
        <br />
        <br />
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
        {/* <span>Total {itemCountGlobal} tasks to be completed.</span> */}
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
      {/* <button type="submit" onClick={handleSave}>
          Save all changes
      </button> */}
      &nbsp;&nbsp;
      <button type="submit" onClick={handleClearhistory}>
        Clear all history
      </button>
      {/* The AG Grid component */}
      {/* <AgGridReact rowData={rowData} columnDefs={colDefs} /> */}
    </form>
  );
}

export default AddTodoItem;
