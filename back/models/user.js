const DataTypes = require('sequelize');
const {Model} = DataTypes;

module.exports = class User extends Model {
    static init(sequelize) {
        return super.init({
            //id가 기본적으로 들어있다.
            email: {
                type: DataTypes.STRING(30),
                allowNull: false, //Null값 허용여부
                unique:true, //고유값
            },
            nickname: {
                type:DataTypes.STRING(30),
                allowNull:false,
            },
            password: {
                type:DataTypes.STRING(100),
                allowNull:false,
            },
        }, {
            modelName: 'User',
            tableName: 'users',
            charset: 'utf8',
            collate: 'utf8_general_ci',//한글 저장
            sequelize
        });
    }
    static associate(db) {
        db.User.hasMany(db.Post);
        db.User.hasMany(db.Comment);
        db.User.belongsToMany(db.Post, {through: 'Like', as: 'Liked'});//좋아요 누른 게시물들
        db.User.belongsToMany(db.User, {through: 'Follow', as: 'Followers', foreignKey: 'FollowingId'});
        db.User.belongsToMany(db.User, {through: 'Follow', as: 'Followings', foreignKey: 'FollowerId'});
    }
};
