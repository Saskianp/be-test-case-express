const express = require('express');
const { getBooks, postBooks, putBook, deleteBooks, getBooksByCode } = require('../controller/books');

const router = express.Router();

router.post('/' ,postBooks);
router.get('/', getBooks);
router.get('/:code', getBooksByCode);
router.put('/:id', putBook);
router.delete('/:id', deleteBooks);


module.exports = router;