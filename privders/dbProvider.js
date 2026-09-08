import Blog from "../services/blog_service.js";
import db from "../services/db_service.js";
import ServiceProvider from "./ServiceProvider.js";


class dbProvider extends ServiceProvider {

       register(){
          this.container.bind("db",() => {  
                return new db()
          })
       }


}



export default  dbProvider ;