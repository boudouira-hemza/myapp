import orm_service from "../services/orm_service.js";
import ServiceProvider from "./ServiceProvider.js";


class ormProvider extends ServiceProvider {

     constructor(container){
         super(container)
     }


     register(){
        this.container.bind("orm",() => {
              const db = this.container.resolve("db")
               return new orm_service(db)
        })
     }

}



export default ormProvider