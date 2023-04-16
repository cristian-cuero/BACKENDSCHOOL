//modelo de la tabla user
const {DataTypes, DATE } = require("sequelize");

const { Group } = require("./Group");
const { TypeDocument } = require("./TypeDocument");


// se usa de esta manera por que se exporta directamente del module.export
const sequelize = require("../database/config")();


const Student = sequelize.define("Student", {
  idu: {
    //llave primaria es unica
    type: DataTypes.STRING(6),
    primaryKey: true,
  },
  phone1: {
    type: DataTypes.STRING(20),
    allowNull: false,
    defaultValue: ''
  },
  phone2: {
    type: DataTypes.STRING(20),
    allowNull: false,
    defaultValue: ''
  },
  document:{
    type: DataTypes.STRING(20),
    allowNull: false,
    defaultValue: ''
  },
  attending:{
    type: DataTypes.STRING(200),
    allowNull: false,
    defaultValue: '',
    comment: 'Nombre Y Apellido Del Acudiente'
  },
  attendingDocument:{
    type: DataTypes.STRING(20),
    allowNull: false,
    defaultValue: '',
    comment: 'Documente Del Acudiente'
  },
  address:{
    type: DataTypes.STRING(200),
    allowNull: false,
    defaultValue: ''
  },
  discount:{
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
    comment: 'Desciento Que Tiene El Estudiante'
  },
  initialCharge:{
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
    comment: 'fecha en la que se le inicia a cobrar al estudiante'
  },
  endCharge:{
    type: DataTypes.DATE,
    allowNull: false,
    comment: 'fecha en la que se termina de  cobrar al estudiante'
  },
  coverage:{
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
    comment: 'si el estudiante es subsidiado true si ,false no'
  },
  Schedule:{
    type: DataTypes.STRING(50),
    allowNull: false,
    defaultValue: '',
    comment: 'jornada del estudiante'
  },
  Note:{
    type: DataTypes.STRING(300),
    allowNull: false,
    defaultValue: '',
  },
  retirementDate:{
    type: DataTypes.DATE,
    comment: 'Fecha De retiro'
  },
  name: {
    type: DataTypes.STRING(100),
    unique: true,
    allowNull: false,
    defaultValue: '',
  },
  lastName:{
    type: DataTypes.STRING(100),
    unique: true,
    allowNull: false,
    defaultValue: '',
  },
  user:{
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: ''
  }
  

});


Student.belongsTo( Group, {
    foreignKey : "IdGroup",
    onUpdate: "CASCADE",
    onDelete: "RESTRICT",
})
Student.belongsTo( TypeDocument, {
    foreignKey : "IdDocument",
    onUpdate: "CASCADE",
    onDelete: "RESTRICT",
})
console.log(Student === sequelize.model.Student);

module.exports = {
    Student,
};
