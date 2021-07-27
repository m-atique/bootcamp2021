export  class item{
  public constructor(public id:number,public task:string,public status:boolean=false){

  }
  public printTodo():void{
    console.log(`${this.id}  \t${this.task}  \t${this.status}`  )
  }
}