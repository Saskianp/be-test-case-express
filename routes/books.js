const express = require('express');
const { getBooks, postBooks, putBook, deleteBooks, getBooksByCode } = require('../controller/books');
const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Book:
 *       type: object
 *       properties:
 *         code:
 *           type: string
 *           description: Book code
 *         title:
 *           type: string
 *           description: Title of the book
 *         author:
 *           type: string
 *           description: Author of the book
 *         stock:
 *           type: integer
 *           description: Stock available for the book
 *       example:
 *         code: "BK001"
 *         title: "Book Title"
 *         author: "Author Name"
 *         stock: 10
 */

/**
 * @swagger
 * /books:
 *   post:
 *     summary: Add a new book
 *     tags: [Books]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Book'
 *     responses:
 *       200:
 *         description: The book was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Book'
 *       500:
 *         description: Some server error
 */
router.post('/', postBooks);

/**
 * @swagger
 * /books:
 *   get:
 *     summary: Get all books
 *     tags: [Books]
 *     responses:
 *       200:
 *         description: List of all books
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Book'
 *       500:
 *         description: Some server error
 */
router.get('/', getBooks);

/**
 * @swagger
 * /books/{code}:
 *   get:
 *     summary: Get book by code
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: code
 *         schema:
 *           type: string
 *         required: true
 *         description: Book code
 *     responses:
 *       200:
 *         description: Book by code
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Book'
 *       404:
 *         description: Book not found
 *       500:
 *         description: Some server error
 */
router.get('/:code', getBooksByCode);

/**
 * @swagger
 * /books/{code}:
 *   put:
 *     summary: Update a book by Code
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: code
 *         schema:
 *           type: string
 *         required: true
 *         description: Book Code
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Book'
 *     responses:
 *       200:
 *         description: The book was successfully updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Book'
 *       404:
 *         description: Book not found
 *       500:
 *         description: Some server error
 */
router.put('/:id', putBook);

/**
 * @swagger
 * /books/{code}:
 *   delete:
 *     summary: Delete a book by Code
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: code
 *         schema:
 *           type: string
 *         required: true
 *         description: Book Code
 *     responses:
 *       200:
 *         description: The book was successfully deleted
 *       404:
 *         description: Book not found
 *       500:
 *         description: Some server error
 */
router.delete('/:id', deleteBooks);

module.exports = router;