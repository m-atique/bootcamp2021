import {item} from './item';

export class todolist {
    private itemId:number=1
    public constructor(public  itemList: item[]=[] ){

    }
    public addTodo(task: string): number{
        this.itemList.push(new item(this.itemId, task, false));
        return this.itemId++;
    }
    public printAll():void{
       this.itemList.forEach((item)=>{item.printTodo() })
   }
   public getitem(id:number):item{
       return this.itemList.find((task)=>task.id == id)

   }

   public taskDone(id:number):void{
     this.getitem(id).status = true
}
}