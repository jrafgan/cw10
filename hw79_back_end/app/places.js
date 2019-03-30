const express = require('express');
const db = require('../fileDb');
const nanoid = require("nanoid");

const createRouter = connection => {
    const router = express.Router();

    router.get('/', (req, res) => {
        connection.query('SELECT * FROM `Places`', (error, results) => {
            if (error) {
                res.status(500).send({error: 'Database error'});
            }
            res.send(results);
        });

    });

    router.get('/:id', (req, res) => {
        connection.query('SELECT * FROM `Places` WHERE `id` = ?', req.params.id, (error, results) => {
            if (error) {
                res.status(500).send({error: 'Database error'});
            }
            if (results[0]) {
                res.send(results[0]);
            } else {
                res.status(404).send({error: 'Place not found'})
            }
        });
    });

    router.post('/', (req, res) => {
        console.log(req.body);
        const place = req.body;
        place.id = nanoid();

        connection.query('INSERT INTO `Places` (`Name`, `Description`) VALUES (?, ?)', [place.name, place.description], (error, results) => {
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