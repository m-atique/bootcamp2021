//-----------------Its nothing but define type to use for code below and this is type for typescriptcode not grpahql
type AppSyncEvent ={
    info:{
        fieldName:string
    }
    arguments:{
        title:string
    }
}

exports.handler = async (event:AppSyncEvent)=>{
    const notesArray =['note1','note2','note3']
    switch(event.info.fieldName){
        case "notes":
            return notesArray
        case "notes":
            return event.arguments.title
        default:
            return null
    }
}