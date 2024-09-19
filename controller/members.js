const Member = require("../models/members");
const Borrow = require('../models/borrow');

exports.postMembers = async (req, res) => {
    try {
        const { name } = req.body;
        const initialCode = 'M';
        const memberCount = await Member.count();
        const nextNumber = memberCount + 1;
        const code = `${initialCode}-${nextNumber}`;

        const member = await Member.create({ code, name });
        res.status(200).json({
          status: 200,
          message: "success",
          data: member,
      });
    } catch (error) {
        res.status(500).json({ message: "Error creating member", error });
    }   
}
exports.getMembers = async(req, res) => {
    try {
        const members = await Member.findAll();
        const membersWithBorrows = await Promise.all(
          members.map(async (member) => {
            const memberCode = member.code;
    
            const activeBorrows = await Borrow.count({
              where: {
                member_code: memberCode, 
                status: 'borrowed',
              },
            });
    
            return {
              ...member.toJSON(), 
              activeBorrows, 
            };
          })
        );
    
        res.status(200).json({
          status: 200,
          message: "success",
          data: membersWithBorrows,
        });
    } catch (error) {
        res.status(500).json({ message: "Error fetching members", error })
    }
}
exports.getMembersByCode = async (req, res) => {
    try {
      const { code } = req.params; 
  
      const member = await Member.findOne({ where: { code } });

      if (!member) {
        return res.status(404).json({ message: "Member not found" });
      }

      const activeBorrows = await Borrow.count({
        where: {
          member_code: member.code, 
          status: 'borrowed',
        },
      });

      const memberWithBorrows = {
        ...member.toJSON(), 
        activeBorrows,
      };

      res.status(200).json({
        status: 200,
        message: "success",
        data: memberWithBorrows, 
      });
    } catch (error) {
      res.status(500).json({
        message: "Error fetching member",
        error: error.message, 
    });
  }
};
  exports.putMembers = async (req, res) => {
    try {
        const { code, name } = req.body;
        const member = await Member.findByPk(req.params.id);
        if (!member) {
          return res.status(404).json({ message: "member not found" });
        }
    
        member.code = code;
        member.name = name;
        await member.save();
        res.status(200).json({
          status: 200,
          message: "success",
          data: member,
      });
      } catch (error) {
        res.status(500).json({ message: "Error updating member", error });
      }
    };
    
  exports.deleteMembers = async (req, res) => {
    try {
      const member = await Member.findByPk(req.params.id);
      if (!member) {
        return res.status(404).json({ message: "member not found" });
      }
  
      await member.destroy();
      res.json({ message: "member deleted" });
    } catch (error) {
      res.status(500).json({ message: "Error deleting member", error });
    }
  };
  