import {createRequire} from 'module';
const require = createRequire(import.meta.url);
const Pool = require('pg').Pool;

export const pool = new Pool({
    user:"postgres",
    password:"pass123test",
    host:"localhost",
    port:5432,
    database: "perntodo"
})