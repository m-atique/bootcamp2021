"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const itemlist_1 = require("./itemlist");
let list = new itemlist_1.todolist();
list.addTodo('go for walk');
list.addTodo('office work');
list.addTodo('gshopping');
//--------------------------complted task
list.taskDone(1);
list.printAll();
