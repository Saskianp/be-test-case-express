const express = require('express');
const { postMembers, getMembers, putMembers, deleteMembers, getMembersByCode } = require('../controller/members');

const router = express.Router();

router.post('/' , postMembers);
router.get('/', getMembers);
router.get('/:code', getMembersByCode);
router.put('/:id', putMembers);
router.delete('/:id', deleteMembers);

module.exports = router;