import { useEffect, useRef, useState } from "react";
import TodoList from "./List";
import "./styles.css";

const filterBasedArray = ["All", "Completed", "To be completed"];

export default function App() {
  const [toDoName, settoDoName] = useState(() => {
    let stored = localStorage.getItem("todos");
    return stored ? JSON.parse(stored) : [];
  });
  const [tododate, settododate] = useState();
  const [fltrOptn, setFltrOptn] = useState("All");
  const inpRef = useRef();
  const datRef = useRef();

  console.log(toDoName);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(toDoName));
  }, [toDoName]);

  function addList() {
    const inpVal = inpRef.current.value;
    // const datRef = datRef.current.value;

    if (inpVal == "") {
      return;
    }

    let item = {
      id: Date.now(),
      todonam: inpVal,
      date: datRef.current.value || "No due date",
      completed: false,
    };

    settoDoName((prev) => [...prev, item]);

    inpRef.current.value = "";
    datRef.current.value = "";
  }

  function updateToDo(id, newName) {
    console.log(newName);
    settoDoName((prev) =>
      prev.map((item) => (item.id == id ? { ...item, todonam: newName } : item))
    );
  }

  function delTask(id) {
    settoDoName((prev) => prev.filter((item) => item.id != id));
  }

  function setDate(id, newDate) {
    settoDoName((prev) =>
      prev.map((item) => (item.id == id ? { ...item, date: newDate } : item))
    );
  }

  function handleCheckBox(id, e) {
    settoDoName((prev) =>
      prev.map((item) =>
        item.id == id ? { ...item, completed: !item.completed } : item
      )
    );
  }

  let filterArray = toDoName.filter((item) => {
    if (fltrOptn == "All") return item;
    if (fltrOptn == "Completed") return item.completed == true;
    if (fltrOptn == "To be completed") return item.completed == false;
  });

  return (
    <div className="todoPar">
      <div className="todoInpHdr">To do app</div>
      <div className="todoInpPar">
        <input
          ref={inpRef}
          // value={}
          // onChange={(e) => e.target.value}
          placeholder="Enter todo name"
        />
        <input
          ref={datRef}
          type="date"
          // onChange={(e) => settododate(e.target.value)}
        />
        <button onClick={() => addList()}>Add task</button>
        <select value={fltrOptn} onChange={(e) => setFltrOptn(e.target.value)}>
          {filterBasedArray.map((item) => {
            return <option value={item}>{item}</option>;
          })}
          ;
        </select>
      </div>
      <div className="todoLstPar">
        {filterArray.length == 0
          ? "No list added yet"
          : filterArray.map((item) => {
              return (
                <TodoList
                  key={item.id}
                  todo={item}
                  updToDo={updateToDo}
                  deletToDo={delTask}
                  updateDate={setDate}
                  handleCheckBox={handleCheckBox}
                />
              );
            })}
      </div>
    </div>
  );
}
