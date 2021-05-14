import { debounce } from "lodash";

import Card from "../UI/Card/Card";
import classes from "./ListItems.module.css";

const INPUT = "input";
const DBLCLICK = "dblclick";
const CLICK = "click";

const ListItems = (props) => {
  const deleteItem = (id, event) => {
    event.preventDefault();
    props.onRightClick(id);
  };

  const changeName = debounce((id, event) => {
    const userInput = event.target.value;

    props.onChange(id, userInput);
  }, 500);

  const clickedHandler = debounce((e, itemId) => {
    if (e.target.localName === INPUT) {
      e.preventDefault();
      return;
    }
    if (e.type === DBLCLICK) {
      props.onDoubleClick(itemId);
    }
    if (e.type === CLICK) {
      props.onClick(itemId);
    }
  }, 500);

  return (
    <ul>
      {props.listItems.map((item) => (
        <li
          key={item.id}
          onClick={(event) => {
            clickedHandler(event, item.id);
          }}
          onDoubleClick={(event) => {
            clickedHandler(event, item.id);
          }}
          onContextMenu={(event) => deleteItem(item.id, event)}
        >
          <Card className={classes["card-item"]}>
            <span>{item.id}</span>
            <label>{item.name}</label>
            <input
              type="text"
              onChange={(event) => {
                changeName(item.id, event);
              }}
            />
          </Card>
        </li>
      ))}
    </ul>
  );
};

export default ListItems;
