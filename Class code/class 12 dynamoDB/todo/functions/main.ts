//importing types from other files 
import Todo from './Todo'

//---------------defining tyes  for typescript use
type AppSyncEvent ={
    info:{
        fieldName:string
    }
    arguments:{
        todoId:string,
        todo:Todo
    }
}

//-----------------------------------------importing functions
