const express = require('express');
const { postMembers, getMembers, putMembers, deleteMembers, getMembersByCode } = require('../controller/members');
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Members
 */

/**
 * @swagger
 * /members:
 *   post:
 *     summary: Create a new member
 *     tags: [Members]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 name:
 *                   type: string
 *                   example: Saskia Novtarisa              
 *     responses:
 *       200:
 *         description: The member was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code: 
 *                  type: string
 *                  example: M-1
 *                 name:
 *                  type: string
 *                  example: Saskia Novtarisa
 *                 createdAt:
 *                   type: datetime
 *                   example: 2024-09-18T09:08:44.000Z
 *                 updatedAt:
 *                   type: datetime
 *                   example: 2024-09-18T09:08:44.000Z
 *                 activeborros:
 *                   type: integer
 *                   example: 2
 *       500:
 *         description: Some server error
 */
router.post('/', postMembers);

/**
 * @swagger
 * /members:
 *   get:
 *     summary: Returns the list of all members
 *     tags: [Members]
 *     responses:
 *       200:
 *        content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code: 
 *                  type: string
 *                  example: M-1
 *                 name:
 *                  type: string
 *                  example: Saskia Novtarisa
 *                 createdAt:
 *                   type: datetime
 *                   example: 2024-09-18T09:08:44.000Z
 *                 updatedAt:
 *                   type: datetime
 *                   example: 2024-09-18T09:08:44.000Z
 *                 activeborros:
 *                   type: integer
 *                   example: 2
 */
router.get('/', getMembers);

/**
 * @swagger
 * /members/{code}:
 *   get:
 *     summary: Get a member by code
 *     tags: [Members]
 *     parameters:
 *       - in: path
 *         name: code
 *         schema:
 *           type: string
 *         required: true
 *         description: The member code
 *     responses:
 *       200:
 *         description: The member description by code
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code: 
 *                  type: string
 *                  example: M-1
 *                 name:
 *                  type: string
 *                  example: Saskia Novtarisa
 *                 createdAt:
 *                   type: datetime
 *                   example: 2024-09-18T09:08:44.000Z
 *                 updatedAt:
 *                   type: datetime
 *                   example: 2024-09-18T09:08:44.000Z
 *                 activeborros:
 *                   type: integer
 *                   example: 2
 *       404:
 *         description: The member was not found
 */
router.get('/:code', getMembersByCode);

/**
 * @swagger
 * /members/{code}:
 *   put:
 *     summary: Update a member by Code
 *     tags: [Members]
 *     parameters:
 *       - in: path
 *         name: code
 *         schema:
 *           type: string
 *         required: true
 *         description: The member Code
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 name:
 *                   type: string
 *                   example: Saskia Novtarisa              
 *     responses:
 *       200:
 *         description: The member was updated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code: 
 *                  type: string
 *                  example: M-1
 *                 name:
 *                  type: string
 *                  example: Saskia Novtarisa
 *                 createdAt:
 *                   type: datetime
 *                   example: 2024-09-18T09:08:44.000Z
 *                 updatedAt:
 *                   type: datetime
 *                   example: 2024-09-18T09:08:44.000Z
 *                 activeborros:
 *                   type: integer
 *                   example: 2
 *       404:
 *         description: The member was not found
 *       500:
 *         description: Some error happened
 */
router.put('/:id', putMembers);

/**
 * @swagger
 * /members/{code}:
 *   delete:
 *     summary: Remove a member by Code
 *     tags: [Members]
 *     parameters:
 *       - in: path
 *         name: code
 *         schema:
 *           type: string
 *         required: true
 *         description: The member Code
 *     responses:
 *       200:
 *         description: The member was deleted
 *       404:
 *         description: The member was not found
 *       500:
 *         description: Some server error
 */
router.delete('/:id', deleteMembers);

module.exports = router;