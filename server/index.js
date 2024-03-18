const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');


const app = express();
app.use(cors());
app.use(express.json());

const port = 3001;

const pool = new Pool({
    user:'postgres',
    host:'localhost',
    database:'todo',
    password:'Jas',
    port:5432
})


app.get("/",(req, res) => {
    pool.query('SELECT * FROM task', (error, result) => {
        if(error){
            res.status(500).json({error:error.message})
        }
        res.status(200).json(result.rows);
    })
});


app.post('/new', (req, res) => {
    pool.query('INSERT INTO task (description) VALUES ($1) RETURNING *', [req.body.description], (error, result) => {
        if (error) {
            res.status(500).json({ error: error.message });
        } else {
            // Assuming 'id' is the name of your identity column
            if (result.rows && result.rows[0]) {
                res.status(201).json(result.rows[0]);
            } else {
                res.status(500).json({ error: "No rows returned" });
            }
        }
    });
});



app.listen(port);