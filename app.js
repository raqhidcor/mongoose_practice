
//Variables

const mongoose = require('mongoose') // importamos mongoose al archivo de javascript
const chalk = require('chalk')
const DB = 'mongoose-example' // variable para guardar la base de datos 

//Models, importamos el modelo 

const Student = require ('./models/Student.js')

//Conectamos la base de datos a nuestro archivo javascript 

const connectToMongo = async()=>{
   try{
   await  mongoose.connect(`mongodb://localhost:27017/${DB}`,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
}) 
console.log(chalk.bgMagenta('Conectad@ a Mongo 🐻'))

    }catch(err){
        console.log ('ERROR:',err)
    }

}


connectToMongo()


// Primer argumento enlace a base de datos que va a ser siempre el mismo mongodb://localhost:27017/ 
//+ el nombre de la base de datos y si no existe la base de datos la va a crear ${DB}

// Segundo argumento 2 configuraciones que van a ser siempre iguales  = 
    // useNewUrlParser: true,
    // useUnifiedTopology: true,



// CREATE 

const createStudent = async()=>{
    try{
       const student = await Student.create({ // como argumento objeto literal siguiendo las reglas del esquema 
            name:"Jaime",
            lastName:"Paredes",
            age:7,
            grades:[4,5,4,4,5,4,4],
            class:'A',
            pendingBills:false 
        })
         console.log (student) 
    } catch (err){
        console.log ('ERROR:',err )
    }

}

// createStudent()


//READ:

//.find(filter,project) --> todos los documentos que cumplan la condicion que le pasamos por el filter que es el primer argumento 

const findStudent = async()=>{
    try{
        const students = await Student.find({age:10},{name:1,lastName:1})
        console.log(students)
    }
    catch(err){
        console.log ('ERROR:',err )
    }
}

// findStudent()

// .findById(id) --> busca documento por su _id 

const findStudentByID= async (id)=>{
    try{
        const student = await Student.findById(id)
        console.log (student)
    } catch(err){
        console.log ('ERROR:',err )
}
}

// findStudentByID('618e3dcab33220ddbece7dab')

//UPDATE 

//findOneAndUpdate(target,elements que quiero cambiar,{new:true}) --> actualiza a un documento 

const updateStudent = async()=>{
    try{ 
        const student = await Student.findOneAndUpdate(
        {name:'Jaime'}, //target
        {pendingBills:true,lastName:'Puyol',"grades.0":100},//elements que quiero cambiar 
        // {"grades.0":100}, // para cambiar elementos dentro de un array 
        {new:true} // esto hay que ponerlo para ver el documento despues de haber sido actualizado, si no ponemos esto vamos a ver el docuemnto antes de haber sido actualizado
        )
        console.log (student)

    }  catch(err){
        console.log ('ERROR:',err )
}
}

// updateStudent()

// updateMany --> actualiza a uno mas elementos que cumplan los requisitos que le pasas 

const updateSomeStudents = async()=>{
    try{
    // const response = await Student.updateMany({age:8},{age:15}) // todos los que tengan 8 años ahora tienen 15 
    const response = await Student.updateMany({idioma: {$exists: false}}, {idioma: "NA"}) //Añade el campo de idioma a todos los alumnos que no tuvieran el campo de idioma (y ponles el valor de NA)
    console.log (response)
   } catch(err){
    console.log ('ERROR:',err )
}
}

updateSomeStudents()


//findByIdAndUpdate() --> actualiza el elemento por id 

const updateStudentById = async (id)=>{
    try{
        const updatedStudent = await Student.findByIdAndUpdate(
            id, // primer argumento el id  
            {age:5}, // elemento a modificar 
            {new:true}
        ) 
        console.log (updatedStudent)
    }catch(err){
        console.log ('ERROR:',err )
    }
}

// updateStudentById("618e3dcab33220ddbece7dab") // id al que se el edita el elemento age a 5 


//DELETE 


// .findOneAndDelete() --> borra todo el documento del alumno que se llama andrea 

const deleteOneStudent = async ()=>{
    try{
       const response = await Student.findOneAndDelete({name:"Andrea"}) // borra todo el documento 
       console.log (response) // enseña el documento que acabamos de borrar 
    }  catch(err){
        console.log ('ERROR:',err )
    }
} 

// deleteOneStudent()

// .deleteMany() --> borra todos los documentos que tengan ese argumento 

const deleteManyStudent = async ()=>{
    try{
       const response = await Student.deleteMany({name:"Andrea"}) // borra todos los estudiants que se llaman Andrea
       console.log (response)
    }  catch(err){
        console.log ('ERROR:',err )
    }
}

// deleteManyStudent()

// .findByIdAndDelete()  --> elimina el documento por su ID 

const deleteStudentById = async(id)=>{
    try{
        const deletedStudent = await Student.findByIdAndDelete(id,{new:true}) // ---> recibe el id poruqe vamos a eliminar por id y el new true para ver el estudiante que acabamos de eliminar por su id 
        console.log (deletedStudent) // --> vemos el estudiante que acabamos de eliminar 
    }catch(err){
        console.log ('ERROR:',err )
    }
}

// deleteStudentById ("618e430038632c1f95c817f4")


// si quisieramos añadir un nuevo field, lo añadimos al esquema y a partir de ahora todos los alumnos nuevos tendran ese field
// para los antiguos, podemos filtrar los antiguos que no tengan ese campo y actualizarlos para que lo tengan haciendo un loop

