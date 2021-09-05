//=================================this is lamba funtion which will executed on sarvar

type AppsyncEvent={
    info:{
        fieldName:string
    }
    arguments:{
        title:string
    }
}
//------------------------------this type is not a grpghql type this is simply a typescript object 
//-------------------appSycevent is only name not aws appsync 



exports.handler = async(event:AppsyncEvent)=>{
   const notesArray =['note1','note2','note3']
   switch (event.info.fieldName) {
       case 'notes':
           return notesArray  
       default:
           return null;
   }
}