import React, { useState, useEffect } from "react";

/**
 * In this project, we will be building the common but
 * surprisingly tricky feature drag and drop reordering in React.
 *
 * To get started, we recommend having drag and drop work with no visual indication.
 * e.g. If you drop onto an element, simple splice the dragged element out of the state
 * and splice it after the element dropped onto
 *
 * https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API#drag_events
 * https://react.dev/reference/react-dom/components/common#dragevent-handler
 */

const styles = {
  listItem: {
    padding: "5px 10px",
    border: "1px solid black",
    borderRadius: 10,
    margin: "5px 0"
  }
};

export default function App() {
  const defaultItems = [
    "Item One",
    "Item Two",
    "Item Three",
    "Item Four",
    "Item Five"
  ];

  const [draggedItem, setDraggedItem] = useState(null);
  // const [draggedPosition, setDraggedPosition] = useState(null);
  const [items, setItems] = useState(defaultItems);

  function handleStart(val) {
    setDraggedItem(val);
  }

  function handleDragOver(item) {
    //setDraggedPosition(item);

    const reOrderedList = [...items];
    // remove dragged item from list
    reOrderedList.splice(items.indexOf(draggedItem), 1);
    // add item back at new position
    reOrderedList.splice(items.indexOf(item), 0, draggedItem);

    setItems(reOrderedList);
  }

  return (
    <div>
      {items.map((text, idx) => (
        <ListItem
          key={idx}
          onDragStart={handleStart}
          onDragOver={handleDragOver}
        >
          {text}
        </ListItem>
      ))}
    </div>
  );
}

const ListItem = ({ onDragStart, onDragOver, children }) => {
  function handleStart(evt) {
    evt.dataTransfer.setData("text/plain", evt.currentTarget.id);
    evt.dataTransfer.effectAllowed = "move";
    onDragStart(children);
  }

  function handleEnd(event) {}

  function handleEnter(event) {}

  function handleLeave(event) {}

  function handleOver(event) {
    onDragOver(children);
  }

  function handleDrop(event) {}

  return (
    <div
      draggable
      style={styles.listItem}
      onDragStart={(e) => handleStart(e)}
      onDragEnd={(e) => handleEnd(e)}
      onDragEnter={(e) => handleEnter(e)}
      onDragLeave={(e) => handleLeave(e)}
      onDragOver={(e) => handleOver(e)}
      onDrop={(e) => handleDrop(e)}
    >
      {children}
    </div>
  );
};
