import Todo from "./todo"
import addTodo from "./addTodo"
import updateTodo from "./updateTodo";
import deleteTodo from "./deleteTodo";
import getTodo from "./getTodo";

//---------------------------------defining typescriipt types to be used in functions its all depends on developer to chooose veriables
type AppSyncEvent = {
    info: {

        functionName: string
    },
    arguments: {
        todoId: string;
        todo: Todo
    }

    //-----------------------------------------------------difining handler function to trigger 


exports.handler = async (event: AppSyncEvent) => {
    switch (event.info.functionName) {
        case "getTodo":
            return await getTodo();

        case "addTodo":
            return await addTodo(event.arguments.todo);

        case "updateTodo":
            return await updateTodo(event.arguments.todo);

        case "deleteTodo":
            return await deleteTodo(event.arguments.todoId);


        default:
            return null;
    }
} 