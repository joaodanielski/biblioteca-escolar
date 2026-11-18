const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Emprestimo = sequelize.define('Emprestimo', {
  dataEmprestimo: {
    type: DataTypes.DATEONLY,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
  dataDevolucaoPrevista: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  dataDevolucao: {
    type: DataTypes.DATEONLY,
    allowNull: true,
  },
});

module.exports = Emprestimo;    