'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Blog extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Blog.init({
    name: DataTypes.TEXT,
    slug: DataTypes.STRING,
    linkimage: DataTypes.STRING,
    description: DataTypes.TEXT,
    image: DataTypes.BLOB('long'),
    contentHTML: DataTypes.TEXT('long'),
  }, {
    sequelize,
    modelName: 'Blog',
  });
  return Blog;
};