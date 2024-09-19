const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Book = require('./books');
const Member = require('./members');

const Borrow = sequelize.define('borrows', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    member_code: {
        type: DataTypes.STRING,
        references: {
            model: Member,
            key: 'code',
        },
    },
    book_code: {
        type: DataTypes.STRING,
        references: {
            model: Book,
            key: 'code',
        },
    },
    borrow_date: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },
    return_date: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'borrowed',
    },
});

Member.hasMany(Borrow, { foreignKey: 'member_code', as: 'borrows' });
Borrow.belongsTo(Member, { foreignKey: 'member_code', as: 'member' });

Book.hasMany(Borrow, { foreignKey: 'book_code', as: 'borrows' });
Borrow.belongsTo(Book, { foreignKey: 'book_code', as: 'book' });

module.exports = Borrow;