"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.todolist = void 0;
const item_1 = require("./item");
class todolist {
    constructor(itemList = []) {
        this.itemList = itemList;
        this.itemId = 1;
    }
    addTodo(task) {
        this.itemList.push(new item_1.item(this.itemId, task, false));
        return this.itemId++;
    }
    printAll() {
        this.itemList.forEach((item) => { item.printTodo(); });
    }
    getitem(id) {
        return this.itemList.find((task) => task.id == id);
    }
    taskDone(id) {
        this.getitem(id).status = true;
    }
}
exports.todolist = todolist;
