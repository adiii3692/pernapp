import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { PORT } from '../../../server/configs.js';
import { toast } from "react-toastify";
import Edit from './Edit.jsx';

const Home = () => {

    const [tasks,setTasks] = useState([]);
    const [description, setDescription] = useState('');
    const notify = (response) => toast.success(response.data.message);
    const [showModal,setModal] = useState(false);
    const [taskNo,setTaskNo] = useState('');
        
    //Method to get all the tasks
    const getTasks = async ()=>{
        await axios.get(`http://localhost:${PORT}/receive`)
        .then((response)=>{
            setTasks(response.data.tasks);
        })
        .catch(function (error) {
            if (error.response) {
              // The request was made and the server responded with a status code
              // that falls out of the range of 2xx
              console.log(error.response.data);
              console.log(error.response.status);
              console.log(error.response.headers);
            } else if (error.request) {
              // The request was made but no response was received
              // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
              // http.ClientRequest in node.js
              console.log(error.request);
            } else {
              // Something happened in setting up the request that triggered an Error
              console.log("Error", error.message);
            }
            console.log(error.config);
          });
    };

    //Method to add a task
    const addTask = async ()=>{

        //Description as a json
        const postDescription = {
            description: description
        }

        await axios.post(`http://localhost:${PORT}/create`,postDescription)
        .then((response)=>{
            console.log('Created Task!');
            notify(response);
        })
        .catch(function (error) {
            if (error.response) {
              // The request was made and the server responded with a status code
              // that falls out of the range of 2xx
              console.log(error.response.data);
              console.log(error.response.status);
              console.log(error.response.headers);
            } else if (error.request) {
              // The request was made but no response was received
              // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
              // http.ClientRequest in node.js
              console.log(error.request);
            } else {
              // Something happened in setting up the request that triggered an Error
              console.log("Error", error.message);
            }
            console.log(error.config);
          });
    };

    //Method to delete a task
    const deleteTask = async (id)=>{

        await axios.delete(`http://localhost:${PORT}/delete/${id}`)
        .then((response)=>{
            console.log('Updated Task!');
            notify(response)
        })
        .catch(function (error) {
            if (error.response) {
              // The request was made and the server responded with a status code
              // that falls out of the range of 2xx
              console.log(error.response.data);
              console.log(error.response.status);
              console.log(error.response.headers);
            } else if (error.request) {
              // The request was made but no response was received
              // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
              // http.ClientRequest in node.js
              console.log(error.request);
            } else {
              // Something happened in setting up the request that triggered an Error
              console.log("Error", error.message);
            }
            console.log(error.config);
          });
    };

    //Method that checks to see if we can show the modal
    const checkModal = ()=>{
        if (!showModal){
            document.getElementById('modal').style.display = 'none'; 
        }
        else{
            document.getElementById('modal').style.display = 'block'; 
        }
    }

    //Update tasks variable to get all the tasks of the user
    useEffect(()=>{
        getTasks();
        checkModal();
    })


  return (
    <div className='flex flex-col justify-center items-center'>
      <div className='flex grow justify-center items-center'>
        PERN To Do List
      </div>
      <div>
        <input type='text' id='descript-input' value={description} placeholder='Description' className='border-2 border-black' onChange={(e)=>setDescription(e.target.value)}/>
        <button className='text-white bg-green-400' onClick={addTask}>Add</button>
      </div>
      <div className='grid grid-cols-4 w-full px-8'>
        <div className='col-span-2'>Description</div>
        <div>Edit</div>
        <div>Delete</div>
        <div className='col-span-4 h-[2px] bg-gray-400 mb-[2px]'></div>
        {(tasks.length==0)?<h1>No Tasks</h1>:tasks.map((task,index)=>(
            <>
                <div className='col-span-2' key={index}>{task.description}</div>
                <div key={index+1}><button className='bg-yellow-400' key={index+1} onClick={()=>{
                    setModal(true);
                    setTaskNo(task.todo_id);
                }}>Edit</button></div>
                <div key={index+2}><button className='bg-red-400 text-white' key={index+2} onClick={()=>{deleteTask(task.todo_id)}}>Delete</button></div>
            </>
        ))}
      </div>
      <Edit setModal={setModal} taskNo={taskNo}/>
    </div>
  )
}

export default Home
