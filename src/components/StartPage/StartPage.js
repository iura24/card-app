import { useState } from "react";

import Card from "../UI/Card/Card";
import classes from "./StartPage.module.css";
import ListItems from "../ListItems/ListItems";
import { LISTITEMS } from "../../dummy-data.js/dummy-data";

function move(array, oldIndex, newIndex) {
  if (newIndex < 0) {
    return array;
  }
  if (newIndex >= array.length) {
    newIndex = array.length - 1;
  }
  array.splice(newIndex, 0, array.splice(oldIndex, 1)[0]);
  return array;
}

const StartPage = (props) => {
  const [listItems, setListItems] = useState(LISTITEMS);

  const onChangeInputHandler = (id, userInput) => {
    setListItems((prevState) => {
      const items = [...prevState];
      const index = items.findIndex((item) => item.id === id);
      items[index] = { id: id, name: userInput };

      return items;
    });
  };

  const moveItemUp = (id) => {
    setListItems((prevState) => {
      const items = [...prevState];
      const index = items.findIndex((item) => item.id === id);
      const updatedItems = move(items, index, index - 1);

      return updatedItems;
    });
  };

  const moveItemDown = (id) => {
    setListItems((prevState) => {
      const items = [...prevState];
      const index = items.findIndex((item) => item.id === id);
      const updatedItems = move(items, index, index + 1);

      return updatedItems;
    });
  };

  const deleteItem = (id) => {
    setListItems((prevState) => {
      const updatedListItems = prevState.filter((item) => item.id !== id);
      return updatedListItems;
    });
  };

  return (
    <Card className={`${classes["card-container"]} `}>
      <ListItems
        listItems={listItems}
        onChange={onChangeInputHandler}
        onClick={moveItemUp}
        onDoubleClick={moveItemDown}
        onRightClick={deleteItem}
      />
    </Card>
  );
};

export default StartPage;
