const Sequelize = require('sequelize');
const db = require('../db');

const Event = db.define('event', {
  eventName: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  startTime: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  endTime: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  year: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  month: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  day: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
});

module.exports = Event;
