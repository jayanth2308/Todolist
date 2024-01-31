import "./Liststask.css";
import axios from 'axios';
import { DndProvider, useDrag } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import { useState ,useEffect } from 'react';
const  ListTask= ({tasks,setTasks}) => {
    
    const[todos,setTodos] = useState([]);
    const[inprogress,setInprogress] = useState([]);
    const[completed,setCompleted] = useState([]);

    useEffect(()=>{

        const ftodos =tasks.filter(task=> task.status ==="todo")
        const finprogress =tasks.filter(task=> task.status ==="inprogress")
        const fcompleted =tasks.filter(task=> task.status ==="completed")

        setTodos(ftodos)
        setInprogress(finprogress)
        setCompleted(fcompleted)
    },[tasks]);

    const statuses = ["todo","inprogress","completed"]
    return (
        <div className='l1'>
            {statuses.map((status,index) =>(
                <Section 
                key={index} 
                status={status} 
                tasks={tasks} 
                setTasks={setTasks} 
                todos={todos} 
                inprogress={inprogress} 
                completed={completed}/>
            ))}
        </div>
    );
}
 
export default ListTask;

const Section = ({status,tasks,setTasks,todos,inprogress,completed}) =>{
    let text="todo";
    let tasksToMap =todos;

    if(status === "inprogress"){
        text = "In progress"
        tasksToMap = inprogress
    }

    if(status === "completed"){
        text = "completed"
        tasksToMap = completed
    }

    return(
        <div>
            <Header text={text} count={tasksToMap.length}/>
            {tasksToMap.length >0 && tasksToMap.map((task) =>(<Task key={task.id} task={task} tasks={tasks} setTasks={setTasks}/>))}
            {/* <h2>{status}</h2> List */}
        </div>
    );
};

const Header =({text}) =>{
    return(
    <div>{text}</div>
    );
};

// ... (other imports)

const Task = ({ task, tasks, setTasks }) => {
    const [{ isDragging }, drag] = useDrag(() => ({
      type: "task",
      collect: (monitor) => ({
        isDragging: !!monitor.isDragging(),
      }),
    }));
  
    const [isEditing, setIsEditing] = useState(false);
    const [editedTaskName, setEditedTaskName] = useState(task.name);
  
    const handleRemove = async (id) => {
      try {
        await axios.delete(`http://localhost:8080/delete/${id}`);
        const fTasks = tasks.filter((t) => t.id !== id);
        setTasks(fTasks);
      } catch (error) {
        console.error("Error deleting task:", error);
      }
    };
  
    const handleEdit = async () => {
        try {
          await axios.put(`http://localhost:8080/update/${task.id}`, {
            name: editedTaskName,
          });
          // You might want to update the state with the edited task
          // For simplicity, here we just refetch all tasks from the server
          const response = await axios.get('http://localhost:8080/');
          setTasks(response.data.data || []);
          setIsEditing(false);
        } catch (error) {
          console.error("Error updating task:", error);
        }
      };
      
  
    return (
      <div ref={drag}>
        {isEditing ? (
          <div>
            <input
              type="text"
              value={editedTaskName}
              onChange={(e) => setEditedTaskName(e.target.value)}
            />
            <button onClick={() => handleEdit(task.id)}>Save</button>
          </div>
        ) : (
          <div>
            <p>{task.name}</p>
            <button onClick={() => handleRemove(task.id)}>delete</button>
            <button onClick={() => setIsEditing(true)}>Edit</button>
          </div>
        )}
      </div>
    );
  };
  
