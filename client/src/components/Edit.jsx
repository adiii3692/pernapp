import React, { useState } from 'react'
import axios from 'axios';
import { PORT } from '../../../server/configs.js';
import { toast } from "react-toastify";

const Edit = ({setModal,taskNo}) => {

    const [description,setDescription] = useState('');
    const notify = (response) => toast.success(response.data.message);

    //Method to update a task
    const updateTask = async ()=>{

        //Description as a json
        const putDescription = {
            description: description
        }

        await axios.put(`https://pernapp-amae.onrender.com/update/${taskNo}`,putDescription)
        .then((response)=>{
            console.log('Updated Task!');
            notify(response);
            setModal(false);
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

  return (
    <div id='modal' className='mt-20 flex flex-col justify-center'>
        <div className='flex justify-center'>Edit Task</div>
        <div className='flex justify-center'><input type='text' id='descript-input' value={description} placeholder='Description' className='border-2 border-black' onChange={(e)=>setDescription(e.target.value)}/></div>
        <div className='flex justify-evenly'>
            <button className='bg-green-400 text-white' onClick={()=>{
                setModal(false);
            }}>Close</button>
            <button className='bg-yellow-400' onClick={updateTask}>Edit</button>
        </div>
    </div>
  )
}

export default Edit
