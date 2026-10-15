

import crypto from "crypto"
import fs from "fs/promises"
import path from "path"


class StorageService {

     constructor(){
              
           this.storagePath =  path.join(process.cwd(), "storage","images")

     }



     async init(){
            await fs.mkdir(this.storagePath,{recursive:true})
     }


     async save(file){

        await  this.init()

        
         const extension = path.extname(file.originalname)

         const filename = crypto.randomUUID()  + extension 
         const fullPath = path.join(this.storagePath , filename)
         

         const url =  `/storage/images/${filename}`


         await fs.writeFile(`${fullPath}`,file.buffer)
         return {
             extension:extension ,
             filename: filename,
             url:url,
             fullPath:fullPath
         }


            
     }

    getPath(filename){

        return path.join(
            this.storagePath,
            filename
        )
    }

    

     



}


export default StorageService 


// class StorageService {

//     constructor()
//     {
//         this.storagePath  = path.join(`${process.cwd()}` , "storage","images");
//     }


//     async createStorageDir(){
//          await  fs.mkdir(this.storagePath,{recursive:true})
//     }


//     async save(file){
          
//           await this.createStorageDir()
//           const extension = path.extname(file.originalname)
//           const filename  =  crypto.randomUUID() + extension
//           const fullPath = path.join(this.storagePath , filename)
//           const url = `http://127.0.0.1:3000/storage/images/${filename}`
          

//           await fs.writeFile(fullPath,file.buffer)


//           return {
//              filename:filename,
//              path: fullPath,
//              url : url,
//              mimetype:file.mimetype
//           }
//     }





// }



// export default StorageService