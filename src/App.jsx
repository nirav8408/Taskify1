import { useState,useEffect } from "react";
import "./App.css";

function App() {
  let [task, setTask] = useState("");
  let [savedTask, setSavedTask] = useState(JSON.parse(localStorage.getItem("tasks")) || []);
  let [editIndex,setEditIndex]=useState(null)

  let [filter,setFilter]=useState("all")

  const filteredTasks=savedTask.filter((t)=>{
    if(filter=="completed") return t.completed;
    if(filter=="pending") return !t.completed;
    return true
  })


  

  useEffect(() => {
  localStorage.setItem("tasks", JSON.stringify(savedTask));
}, [savedTask]);




  useEffect(()=>{
    localStorage.setItem("tasks",JSON.stringify(savedTask))
  },[savedTask])

  const addTask = () => {
    if(editIndex!=null)
    {
      const tasks=[...savedTask]
      tasks[editIndex]={...tasks[editIndex],text:task}
      setSavedTask(tasks)
      setEditIndex(null)
    }
    else
    {
      setSavedTask([...savedTask, {text:task,completed:false}]);
    }
     setTask("");
    
  };

  const removeTask = (index) => {
    setSavedTask(savedTask.filter((_, i) => i !== index));
  };


  const editTask=(index)=>{
    setTask(savedTask[index].text)
    setEditIndex(index)
    
  }


  const toggleComplete=(index)=>{
    const tasks=[...savedTask]
    tasks[index].completed=!tasks[index].completed
    setSavedTask(tasks)
  }

  const completedTask=savedTask.filter(t=>t.completed).length;
  const pendingTask=savedTask.length-completedTask;

  return (
    <>
      <div className="container">
        <p className="title">Taskify</p>



        <input
          className="task-input"
          type="text"
          placeholder="Enter Task"
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />

        <button className="add-btn" onClick={addTask}>
          {editIndex!=null?"Edit Task":"Add Task"}
        </button>

        <div className="filter-buttons">
              <button className="filter-button" onClick={()=>{setFilter("all")}}>All</button>
              <button className="filter-button" onClick={()=>{setFilter("pending")}}>Pending</button>
              <button className="filter-button" onClick={()=>{setFilter("completed")}}>Completed</button>
        </div>

        <ul className="task-list">
          {filteredTasks.map((t, index) => {
            return (


              <li className="task-item" key={t}>
                <input type="checkbox" checked={t.completed}
                onChange={()=>toggleComplete(index)}></input>


                <span className={`task-text ${t.completed ? "completed" : ""}`} style={{textDecoration:t.completed?"line-through":"none"}}>{t.text} </span>


                <button
                  className="remove-btn"
                  onClick={() => removeTask(index)}
                >
                  Remove
                </button>

                 <button
                  className="remove-btn"
                  onClick={() => editTask(index)}
                >
                   Edit
                </button>
              </li>
            );
          })}
        </ul>
        <p className="counter">
          Pending Task:{pendingTask} | Completed Task:{completedTask}
        </p>
      </div>
    </>
  );
}

export default App;
