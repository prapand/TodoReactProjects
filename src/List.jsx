import { useState, useRef } from "react";

export default function TodoList({
  todo,
  updToDo,
  deletToDo,
  updateDate,
  handleCheckBox,
}) {
  const [isEdit, setIsEdit] = useState(false);
  const [tempValue, settempValue] = useState();
  const tempInpRef = useRef();

  function updName() {
    settempValue(todo.todonam);
    setIsEdit(true);
    setTimeout(() => {
      tempInpRef.current.focus();
    }, 0);
  }

  function disblInp() {
    setIsEdit(false);
    updToDo(todo.id, tempValue);
  }

  return (
    <div className="todoLst" data-ui-completed={todo.completed}>
      <span>
        <input
          type="checkbox"
          onClick={(e) => handleCheckBox(todo.id, e)}
          checked={todo.completed}
        />
      </span>
      <span>
        {isEdit ? (
          <input
            ref={tempInpRef}
            type="text"
            value={tempValue}
            onChange={(e) => settempValue(e.target.value)}
            onBlur={disblInp}
          />
        ) : (
          <span onClick={updName}>{todo.todonam}</span>
        )}
      </span>
      <input
        type="date"
        value={todo.date}
        onChange={(e) => updateDate(todo.id, e.target.value)}
      />
      <button onClick={() => deletToDo(todo.id)}>Delete</button>
    </div>
  );
}
