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
        connection.query('SELECT * FROM `Items`', (error, results) => {
            if (error) {
                res.status(500).send({error: 'Database error'});
            }
            res.send(results);
        });

    });

    router.get('/:id', (req, res) => {
        connection.query('SELECT * FROM `Items` WHERE `id` = ?', req.params.id, (error, results) => {
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
        const item = req.body;
        item.id = nanoid();

        if (req.file) {
            item.image = req.file.filename;
            console.log('image added');
        }

        connection.query('INSERT INTO `Items` (`Name`, `Category_fk`, `Place_fk`, `Description`, `image`) VALUES (?, ?, ?, ?, ?)', [item.name, item.category, item.place, item.description, item.image], (error, results) => {
            if (error) {
                console.log(error);
                res.status(500).send({error: 'Database error'});
            } else {
                res.send({message: 'OK'});
            }

        });
    });

    router.put('/:id', upload.single('image'), (req, res) => {
        console.log(req.body);
        const item = req.body;
        item.id = req.params.id;

        if (req.file) {
            item.image = req.file.filename;
        }
        //DELETE FROM `hw79_extra`.`Items` WHERE `id`='4';
        connection.query('UPDATE `Items` WHERE id = ? (`Name`, `Category_fk`, `Place_fk`, `Description`, `image`) VALUES (?, ?, ?, ?, ?, ?)', [item.id, item.name, item.category, item.place, item.description, item.image], (error, results) => {
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
