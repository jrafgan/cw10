const express = require('express');
const db = require('../fileDb');
const nanoid = require("nanoid");

const createRouter = connection => {
    const router = express.Router();

    router.get('/', (req, res) => {
        connection.query('SELECT * FROM `Comments`', (error, results) => {
            if (error) {
                res.status(500).send({error: 'Database error'});
            }
            res.send(results);
        });

    });

    router.get('/:id', (req, res) => {
        connection.query('SELECT * FROM `Comments` WHERE `id` = ?', req.params.id, (error, results) => {
            if (error) {
                res.status(500).send({error: 'Database error'});
            }
            if (results[0]) {
                res.send(results[0]);
            } else {
                res.status(404).send({error: 'Comment not found'})
            }
        });
    });

    router.post('/', (req, res) => {
        console.log('Req params id ', req.body.id);
        const comment = req.body;
        // comment.id = req.params.id;

        connection.query('INSERT INTO `Comments` (`news_id`, `author`, `comment`) VALUES (?, ?, ?)', [comment.id, comment.name, comment.description], (error, results) => {
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
        const comment = req.body;
        comment.id = req.params.id;

        connection.query('UPDATE `Categories` (`id`, `Name`, `Description`) VALUES (?, ?, ?)', [comment.id, comment.name, comment.description], (error, results) => {
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