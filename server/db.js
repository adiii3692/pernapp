import {createRequire} from 'module';
const require = createRequire(import.meta.url);
const Pool = require('pg').Pool;
require('dotenv').config();

const db_url = process.env.DB_URL;
export const pool = new Pool({
    connectionString: db_url,
    ssl: {
        require: true,
        rejectUnauthorized: false,
      }
})