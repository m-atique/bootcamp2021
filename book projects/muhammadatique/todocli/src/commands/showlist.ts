import {Command ,flags} from '@oclif/command';

//---------------two decorate outputs using library chalks, clitable
import chalk = require('chalk');
import Table = require('cli-table')


//-------------------------import database
import {JsonTodoList} from'../db'



//--------------------------------------------------------------------defining todolist 
import {todo} from './add'
export class TodoList {
  private nextId: number = 1;
  protected itemMap = new Map<number, todo>();

  constructor(public userName: string, todoItems: todo[] = []) {
      todoItems.forEach(item => this.itemMap.set(item.id, item));
  }
//------------------------------------------------------------------------------------------getting elemnt by id
getTodoItems(includeComplete: boolean): todo[] {
  return [...this.itemMap.values()]
      .filter(item => includeComplete || !item.complete);
}


}

//---======================================================================================================


export default class showlist extends Command{
  static description="This will add new ToDo in list"
  static args =[{name:'showlist'}]

  static flags = {
    help: flags.help({char: 'h',description: "this will add new task"}),
    //------------------------------------------------------------------------ flag with a value (-t, --todo=VALUE)
    todo: flags.string({char: 't', description: 'task to add'}),
  }
  async run(){
    const {args}=this.parse(showlist)

    let todos: todo[] = [
      new todo(1, "Buy Flowers"), new todo(2, "Get Shoes"),
      new todo(3, "Collect Tickets"), new todo(4, "Call Joe", true)];
  
  //---------------------------------------------------  connecting to database
  let collection: TodoList = new JsonTodoList("Ateeq", todos);
  
    //--------------------------------------------getting data from database
    const list= collection.getTodoItems(false)
    //--------------------------------------------table design
    const table = new Table({
      head: [
        chalk.blueBright('index'),
        chalk.blueBright('Task'),
        chalk.blueBright('Status')
      ]
    });
    //---------------------------------------------putting values in table
    this.log(`${typeof(list)}`)
    // for(let i=0 ;i<list.length;i++){
    //   const todo = list[i]
    //   // const status = todo.done ? chalk.green('Done') : chalk.red('Pending')
    //     table.push([i,todo.task,status])
    // }
    // this.log(` =====* MY ToDo List *=====`)
    // this.log(table.toString())
}
}
