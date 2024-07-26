//Import and require important libraries
import { create } from 'domain';
import { PORT } from './configs.js';
import {createRequire} from 'module';
const require = createRequire(import.meta.url);
const express = require('express');
const app = express();
const cors = require('cors');
import { pool } from './db.js';
import routes from './routes.js';

//Cors 
app.use(cors());
//Pars as json
app.use(express.json());

//Listen to a port
app.listen(PORT,()=>{
    console.log("Server running on port: "+PORT);
})

//Just to check if server is running
app.get('/',(request,response)=>{
    return response.send("Welcome to Ad's PERN app");
})

//Routes
app.use('/',routes);