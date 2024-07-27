import express from 'express';
import { pool } from './db.js';

const router = express.Router();

//Route to create a task
router.post('/create',async(request,response)=>{
    try {
        const description = request.body.description;
        const newToDo = await pool.query("INSERT INTO todo (description) VALUES($1) RETURNING *",[description]);

        return response.status(200).json({message:"Created Task!",task:newToDo.rows});
    } catch (error) {
        console.log(error.message);
        return response.status(500).send({ message: error.message });
    }
});

//Route to get all tasks
router.get('/receive',async(request,response)=>{
    try {
        const allTasks = await pool.query('SELECT * FROM todo');
        return response.status(200).json({message:"Received all tasks",tasks:allTasks.rows});
    } catch (error) {
        console.log(error.message);
        return response.status(500).send({ message: error.message });
    }
})

//Route to get a todo
router.get('/details/:id',async(request,response)=>{
    try {
        const id = request.params.id;
        const task = await pool.query('SELECT * FROM todo WHERE id = $1',[id]);

        return response.status(200).json({message:"Received one task",task:task.rows});
    } catch (error) {
        console.log(error.message);
        return response.status(500).send({ message: error.message });
    }
});

//Route to update a todo
router.put('/update/:id',async(request,response)=>{
    try {
        const id = request.params.id;
        const description = request.body.description;

        const updatedTask = await pool.query('UPDATE todo SET description=$1 WHERE id=$2 RETURNING *',[description,id]);
        return response.status(200).json({message:"Task Updated!",updatedTask:updatedTask.rows});
        
    } catch (error) {
        console.log(error.message);
        return response.status(500).send({ message: error.message });
    }
});

//Route to delete a todo
router.delete('/delete/:id',async(request,response)=>{
    try {
        const id = request.params.id;
        const deletedTask = await pool.query('DELETE FROM todo WHERE id=$1 RETURNING *',[id]);

        return response.status(200).json({message:'Task Deleted!',deletedTask:deletedTask.rows});
    } catch (error) {
        console.log(error.message);
        return response.status(500).send({ message: error.message });
    }
})

export default router;