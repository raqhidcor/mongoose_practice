// Un esquema es el conjunto de reglas que vamos a aplicar a un modelo para agregarlo a la collection de nuestra data base 
// la estructura que van a tener nuestros documentos dentro del collection

// importar mongoose

const mongoose = require('mongoose')

// importar esquemas 

const Schema = mongoose.Schema

// aplicamos todos los datos que queremos que tenga el esquema de studentSchema 

const studentSchema = new Schema ({
    name: {type:String,required:true,maxlength:40}, // todos tienen que tener nombre si o si required:true y un nombre de max 40 caracteres
    lastName: {type:String,required:true},
    age:{type:Number,required:true,max:99}, // todos tienen que tener edad y hasta max 99 años 
    grades:{type:Array},
    class:{type:String,enum:["A","B"]}, // class tiene que ser A o B 
    pendingBills:{type:Boolean,default:false},// si no se inicia con un valor por defecto es false 
    idioma:{type:String,enum:["english","spanish","NA"]}

},{versionKey:false,timestamps:true}) // elimina la version __v y el timesstamps añade la fecha en la que fue creado y actualizado 

// exportar el modelo para poder usarlo en app.js

module.exports = mongoose.model('Student', studentSchema) // 'Student' NOMBRE DEL MODELO + el esquema 

