import React, { useEffect, useState, useRef } from "react";
import "./TodoList.css";
import "./ListItems.jsx";
import ListItems from "./ListItems.jsx";
import CompletedItems from "./CompletedItems.jsx";
import { AgGridReact } from "ag-grid-react"; // React Grid Logic
import "ag-grid-community/styles/ag-grid.css"; // Core CSS
import "ag-grid-community/styles/ag-theme-quartz.css"; // Theme
import { useItemCount } from "../../hooks/useItemCount.js";

function AddTodoItem() {
  const [inputtext, setInput] = useState("");
  const [items, setItems] = useState([]);
  const inputRef = useRef();
  const selectedItems = useRef([]);
  const [completedItems, setcompletedItems] = useState([]);
  const [_, itemCountSetter] = useItemCount();

  //const GridExample = () => {
  // Row Data: The data to be displayed.
  const [rowData, setRowData] = useState([
    { make: "Tesla", model: "Model Y", price: 64950, electric: true },
    { make: "Ford", model: "F-Series", price: 33850, electric: false },
    { make: "Toyota", model: "Corolla", price: 29600, electric: false },
  ]);

  // Column Definitions: Defines the columns to be displayed.
  const [colDefs, setColDefs] = useState([
    { field: "make" },
    { field: "model" },
    { field: "price" },
    { field: "electric" },
  ]);

  // ...
  //};

  useEffect(() => {
    if (localStorage.items){
      itemCountSetter(JSON.parse(localStorage.getItem("items")).length);
    }
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
  };

  const clickHandler = () => {
    setItems((item) => [...item, { id: item.length, data: `${inputtext}` }]);
    setInput("");
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    itemCountSetter(items.length);
    localStorage.items = JSON.stringify(items);
    localStorage.completedItems = JSON.stringify(completedItems);
    
  };

  const itemUpdated = (id) => {
    selectedItems.current.push(id);
  };

  const handleDelete = () => {
    selectedItems.current.forEach((element) => {
      completedItems.push(items[element]);
      itemCountSetter(items.length);
      localStorage.items = JSON.stringify(items);
      localStorage.completedItems = JSON.stringify(completedItems);
    });

    setcompletedItems(completedItems);
    setItems(items.filter((i) => !completedItems.includes(i)));
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
    <div>
      <form onSubmit={handleSubmit}>
        <div>
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
          <div
            className="ag-theme-quartz" // applying the grid theme
            style={{ height: 200 }} // the grid will fill the size of the parent container
          >
            <AgGridReact rowData={rowData} columnDefs={colDefs} />
          </div>
          <br />
          <br />
          <button type="submit" onClick={handleDelete}>
            Move to completed
          </button>
          <br />
          Completed tasks:
          <ul className="cmpList">
            {completedItems.map((completedItem) => (
              <CompletedItems
                key={completedItem.id}
                data={completedItem.data}
              />
            ))}
          </ul>
        </div>
        <br />
        <br />
        &nbsp;&nbsp;
        <button type="submit" onClick={handleClearhistory}>
          Clear all history
        </button>
      </form>
    </div>
  );
}

export default AddTodoItem;
