const express = require('express');
const {borrowBook, returnBook} = require("../controller/borrow");
const router = express.Router();

/**
 * @swagger
 * /borrow:
 *   post:
 *     summary: Borrow books
 *     tags:
 *       - Borrow
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               memberCode:
 *                 type: string
 *                 description: Member code yang akan meminjam buku
 *                 example: M-1
 *               bookCodes:
 *                 type: array
 *                 description: Daftar kode buku yang dipinjam (maksimal 2)
 *                 items:
 *                   type: string
 *                 example: ["B-1", "B-2"]
 *     responses:
 *       200:
 *         description: Books borrowed successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Buku berhasil dipinjam!
 *                 books:
 *                   type: array
 *                   items:
 *                     type: string
 *                   example: ["B-1", "B-2"]
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Member sudah meminjam buku atau melebihi batas peminjaman (maksimal 2).
 *       403:
 *         description: Forbidden (penalti)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Member sedang dalam masa penalti. Tidak bisa meminjam buku.
 *       404:
 *         description: Book not found or out of stock
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Buku dengan kode B-1 tidak ditemukan atau stok habis.
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Internal server error
 */

/**
 * @swagger
 * /borrow/return:
 *   post:
 *     summary: Return a borrowed book
 *     tags:
 *       - Borrow
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               memberCode:
 *                 type: string
 *                 description: Member code yang mengembalikan buku
 *                 example: M-1
 *               bookCode:
 *                 type: string
 *                 description: Kode buku yang dikembalikan
 *                 example: B-1
 *     responses:
 *       200:
 *         description: Book returned successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Buku berhasil dikembalikan!
 *                 borrow:
 *                   type: object
 *                   properties:
 *                     member_code:
 *                       type: string
 *                       example: M-1
 *                     book_code:
 *                       type: string
 *                       example: B-1
 *                     borrow_date:
 *                       type: string
 *                       example: "2023-09-19T12:34:56.000Z"
 *                     return_date:
 *                       type: string
 *                       example: "2023-09-26T12:34:56.000Z"
 *                     status:
 *                       type: string
 *                       example: returned
 *       400:
 *         description: Borrow record not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Peminjaman tidak ditemukan.
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Internal server error
 */

router.post('/', borrowBook);
router.post('/return', returnBook);

module.exports = router;
