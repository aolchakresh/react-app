import React, { useState } from "react";

function ListItems(props) {
  const [check, setCheck] = useState(false);
  const handleClick = (event) => {
    setCheck(event.target.checked);
    props.itemUpdated(props.id, event.target.checked);
  };
  return (
    <li>
      <input type="checkbox" onChange={handleClick} value={check} />
      {props.data}
    </li>
  );
}

export default ListItems;
