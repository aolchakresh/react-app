import { useState, useEffect } from "react";
import itemCount from "../Todolist/Store";

export function useItemCount() {
  const [itemCountGlobal, setItemCountGlobal] = useState(itemCount.value);

  useEffect(() => {
    itemCount.subscribe((value) => setItemCountGlobal(value));
  }, []);

  const itemCountSetter = (value) => {
    itemCount.next(value);
  };

  return [itemCountGlobal, itemCountSetter];
}
