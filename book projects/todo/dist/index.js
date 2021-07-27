"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const todoItem_1 = require("./todoItem");
const todoList_1 = require("./todoList");
let todos = [
    new todoItem_1.TodoItem(3, "Collect Tickets"), new todoItem_1.TodoItem(4, "Call Joe", true)
];
let collection = new todoList_1.TodoList("Adam", todos);
console.clear();
console.log(`
***********************************
---${collection.userName}'s Todo List---
***********************************` + `
${collection.getItemCounts().incomplete} items to do
---------------------`);
let newId = collection.addTodo("Go for run");
let todoItem = collection.getTodoById(newId);
// console.log(JSON.stringify(todoItem));
// todoItem.printTodo();
// collection.addTodo(todoItem);
collection.removeComplete();
collection.updateTodo(2, new todoItem_1.TodoItem(2, "get milk"));
collection.getTodoItems(true).forEach(item => item.printTodo());
