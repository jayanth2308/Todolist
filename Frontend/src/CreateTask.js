import React, { Component } from 'react';
import axios from 'axios';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
const  CreateTask= ({tasks,setTasks}) => {

    const [task,setTask]=useState({
        id:"",
        name:"",
        status:"todo"
    });
    console.log("task" ,task);

    async function handleSubmit(e){
      e.preventDefault();

      if (task.name.length < 3) {
        alert("Task name should be greater than 3 characters");
        return;
      } else {
        try {
          await axios.post("http://localhost:8080/create", {
            id: uuidv4(),
            name: task.name,
            status: "todo",
          });
        } catch (error) {
          console.error("Error creating task:", error);
        }
      }
      
        // Retrieve existing tasks from local storage
        const response = await axios.get('http://localhost:8080/');
        const existingTasks = response.data.data || [];
        const updatedTasks = [...existingTasks];
        setTasks(updatedTasks);
      
        // Reset the task state
        setTask({
          id: "",
          name: "",
          status: "todo",
        });
      };
      

    return (
        <form onSubmit={handleSubmit}>
            <input type='text' value={task.name} onChange={e=>setTask({...task, id :uuidv4() ,name:e.target.value})}/>
            <button type="submit">Create task</button>   
        </form>
    );
};
 
export default CreateTask;