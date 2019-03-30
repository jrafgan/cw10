const express = require('express');
const multer = require('multer');
const path = require('path');
const nanoid = require("nanoid");
const config = require('../config');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, config.uploadPath);
    },
    filename: (req, file, cb) => {
        cb(null, nanoid() + path.extname(file.originalname));
    }
});

const upload = multer({storage});

const createRouter = connection => {
    const router = express.Router();

    router.get('/', (req, res) => {
        connection.query('SELECT * FROM `News`', (error, results) => {
            if (error) {
                res.status(500).send({error: 'Database error'});
            }
            res.send(results);
        });

    });

    router.get('/:id', (req, res) => {
        connection.query('SELECT * FROM `News` WHERE `id` = ?', req.params.id, (error, results) => {
            if (error) {
                res.status(500).send({error: 'Database error'});
            }
            if (results[0]) {
                // 'SELECT * FROM `Categories` WHERE `id` =  category_fk ?'
                res.send(results[0]); // id name descr category place image
            } else {
                res.status(404).send({error: 'Item not found'})
            }
        });
    });

    router.post('/', upload.single('image'), (req, res) => {
        console.log(req.body);
        const post = req.body;

        if (req.file) {
            post.image = req.file.filename;
            console.log('image added');
        }

        connection.query('INSERT INTO `News` (`header`, `news_body`, `image`, `date`) VALUES (?, ?, ?, ?)', [post.header, post.description, post.image, post.date], (error, results) => {
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

        connection.query('DELETE FROM `News` WHERE id = ?', req.params.id, (error, results) => {
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
