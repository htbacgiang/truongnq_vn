'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Video extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Video.init({
    nameVideo: DataTypes.TEXT,
    youtubeId: DataTypes.STRING,
    image: DataTypes.STRING,
    contentHTML: DataTypes.TEXT('long'),
  }, {
    sequelize,
    modelName: 'Video',
  });
  return Video;
};