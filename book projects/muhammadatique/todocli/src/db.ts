import * as lowdb from 'lowdb';
import * as FileSync from 'lowdb/adapters/FileSync'

//--------------------------------------------------------------------------------jason database class
import {todo} from './commands/add'
import {TodoList} from './commands/showlist'

//----------------------------------------------------------definined  pattren to store data
type schemaType = {
    todos: {
        id: number,
        task: string,
        complete: boolean
    }[]
}

export class JsonTodoList extends TodoList {
    private database: lowdb.LowdbSync<schemaType>
    constructor(public userName: string, todoItems: todo[]) {

        super(userName, [])
        this.database = lowdb(new FileSync("tododb.Json"))
        if (this.database.has("todos").value()) {
            let dbitems = this.database.get("todos").value()
            dbitems.forEach(item => this.itemMap.set(item.id, new todo(item.id, item.task, item.complete)))
        }
        else {
            this.database.set("todos", todoItems).write();
            todoItems.forEach(item => this.itemMap.set(item.id, item))
        }
    }
    private storeTasks() {
        this.database.set("todos", [...this.itemMap.values()]).write();
    }
//---------------------------------------------------------------------------------find id



    // addTodo(task: string): number {
    //     let result = 
    //     this.storeTasks()
    //     return result
    // }
   


}
//============================================================================================================





