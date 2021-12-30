import Todo from "./todo"
const AWs = require('aws-sdk')
const docClient= new AWs.DYnamoDB.DocumentClient();

async function updateTodo(todo:Todo) {
    
}

export default updateTodo