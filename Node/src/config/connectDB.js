const { Sequelize } = require('sequelize');

// Option 2: Passing parameters separately (other dialects)
// const sequelize = new Sequelize('truongnq_vn', 'admin', 'Truong*123', {
//   host: 'truongnq-vn.csh5sjcsoz30.ap-northeast-1.rds.amazonaws.com',
//   dialect: 'mysql',
//   logging: false
// });
const sequelize = new Sequelize('truongnq_vn', 'admin', "Truong*123", {
  host: 'truongnq-vn.csh5sjcsoz30.ap-northeast-1.rds.amazonaws.com',
  dialect: 'mysql',
  logging: false
});
let connectDB = async() => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
      } catch (error) {
        console.error('Unable to connect to the database:', error);
      }
}
module.exports = connectDB;