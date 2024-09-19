const express = require('express');
const {borrowBook, returnBook} = require("../controller/borrow");

const router = express.Router();

router.post('/', borrowBook);
router.post('/return', returnBook);

module.exports = router;
