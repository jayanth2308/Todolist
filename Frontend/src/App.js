import React, { useEffect } from 'react';
import { useState } from 'react';
import './App.css';
import CreateTask from './CreateTask';
import ListTask from './Listtask';
import { BrowserRouter as Router } from 'react-router-dom';
import ReactDOM from 'react-dom';
import { DndProvider, useDrag } from 'react-dnd'
import { ItemTypes } from './Constants';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useNavigate , useLocation } from 'react-router-dom';
import axios from 'axios';
function App() {
  const [tasks, setTasks] = useState([]);
  // const location =useLocation()

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        // Fetch tasks from the server using Axios GET request
        const response = await axios.get('http://localhost:8080/');
        const fetchedTasks = response.data.data || [];

        // Set the tasks in the state
        setTasks(fetchedTasks);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    // Call the fetchTasks function
    fetchTasks();
  }, []); // Empty dependency array ensures that this runs only once when the component mounts

  console.log("tasks",tasks)
  return (
    <DndProvider backend={HTML5Backend}>
      <div>
      {/* <h1>Hello {location.state.id} and welcome to do list</h1> */}
      <CreateTask tasks={tasks} setTasks={setTasks} />
      <ListTask tasks={tasks} setTasks={setTasks} />
    </div>
    </DndProvider>
    
  );
}

export default App;
