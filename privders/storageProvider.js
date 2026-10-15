
import ServiceProvider from "./ServiceProvider.js"
import StorageService from "../services/strorage_service.js"


class StorageProvider extends ServiceProvider {

      constructor(container){
          super(container)
      }


      register(){

         this.container.bind("storage",() => {
              return new StorageService()
         })
      }






}


export default StorageProvider