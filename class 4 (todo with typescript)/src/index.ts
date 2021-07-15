import {item} from './item'
import {todolist} from  './itemlist'


 
 let list:todolist =new todolist()
 list.addTodo('go for walk')
 list.addTodo('office work')
 list.addTodo('gshopping')
 
 //--------------------------complted task
 list.taskDone(1)
 list.printAll()