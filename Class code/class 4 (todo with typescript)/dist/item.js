"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.item = void 0;
class item {
    constructor(id, task, status = false) {
        this.id = id;
        this.task = task;
        this.status = status;
    }
    printTodo() {
        console.log(`${this.id}  \t${this.task}  \t${this.status}`);
    }
}
exports.item = item;
