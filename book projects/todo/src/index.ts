import { TodoItem } from "./todoItem";
import { TodoList } from "./todoList";
let todos:TodoItem[] = [
    new TodoItem(1, "Buy Flowers"), new TodoItem(2, "Get Shoes"),
    new TodoItem(3, "Collect Tickets"), new TodoItem(4, "Call Joe", true)];
let collection:TodoList = new TodoList("Adam", todos);
console.clear();
console.log(`
***********************************
---${collection.userName}'s Todo List---
***********************************`+ `
${ collection.getItemCounts().incomplete } items to do
---------------------`);
let newId:number = collection.addTodo("Go for run");
let todoItem:TodoItem = collection.getTodoById(newId);
// console.log(JSON.stringify(todoItem));
// todoItem.printTodo();
// collection.addTodo(todoItem);
collection.removeComplete();
collection.updateTodo(2,new TodoItem(2,"get milk"))
collection.getTodoItems(true).forEach(item => item.printTodo());
