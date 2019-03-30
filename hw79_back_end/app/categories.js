const express = require('express');
const db = require('../fileDb');
const nanoid = require("nanoid");

const createRouter = connection => {
    const router = express.Router();

    router.get('/', (req, res) => {
        connection.query('SELECT * FROM `Categories`', (error, results) => {
            if (error) {
                res.status(500).send({error: 'Database error'});
            }
            res.send(results);
        });

    });

    router.get('/:id', (req, res) => {
        connection.query('SELECT * FROM `Categories` WHERE `id` = ?', req.params.id, (error, results) => {
            if (error) {
                res.status(500).send({error: 'Database error'});
            }
            if (results[0]) {
                res.send(results[0]);
            } else {
                res.status(404).send({error: 'Category not found'})
            }
        });
    });

    router.post('/', (req, res) => {
        console.log(req.body);
        const category = req.body;
        category.id = nanoid();

        connection.query('INSERT INTO `Category` (`Name`, `Description`) VALUES (?, ?)', [category.name, category.description], (error, results) => {
            if (error) {
                console.log(error);
                res.status(500).send({error: 'Database error'});
            } else {
                res.send({message: 'OK'});
            }

        });
    });

    router.put('/:id', (req, res) => {
        console.log(req.body);
        const category = req.body;
        category.id = req.params.id;

        connection.query('UPDATE `Categories` (`id`, `Name`, `Description`) VALUES (?, ?, ?)', [category.id, category.name, category.description], (error, results) => {
            if (error) {
                console.log(error);
                res.status(500).send({error: 'Database error'});
            } else {
                res.send({message: 'OK'});
            }

        });
    });

    return router;
};

module.exports = createRouter;