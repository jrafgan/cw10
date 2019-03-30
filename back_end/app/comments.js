const express = require('express');
const createRouter = connection => {
    const router = express.Router();

    router.get('/', (req, res) => {
        if (req.query.news_id) {
            connection.query('SELECT * FROM `Comments` WHERE `news_id` = ?', req.query.news_id, (error, results) => {
                if (error) {
                    res.status(500).send({error: 'Database error'});
                }
                res.send(results);
            });
        } else {
            connection.query('SELECT * FROM `Comments`', (error, results) => {
                if (error) {
                    res.status(500).send({error: 'Database error'});
                }
                res.send(results);
            });
        }
    });

    router.post('/', (req, res) => {
        console.log('Req params id ', req.body.id);
        const comment = req.body;

        connection.query('INSERT INTO `Comments` (`news_id`, `author`, `comment`) VALUES (?, ?, ?)', [comment.id, comment.name, comment.comment], (error, results) => {
            if (error) {
                console.log(error);
                res.status(500).send({error: 'Database error'});
            } else {
                res.send({message: 'OK'});
            }

        });
    });

    router.delete('/:id', (req, res) => {
        console.log(req.body);
        const post = req.body;
        post.id = req.params.id;

        connection.query('DELETE FROM `Comments` WHERE id = ?', req.params.id, (error, results) => {
            console.log('req.params.id ', req.params.id);
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