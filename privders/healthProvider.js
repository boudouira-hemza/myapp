
import healthController from "../controllers/healthController.js";
import ServiceProvider from "./ServiceProvider.js";

class HealthProvider extends ServiceProvider {

       constructor(container){
           super(container)
       }


       register(){
         
          this.container.bind('health',() => {
              
             const blog = this.container.resolve("blog")
        
              return new healthController(blog) 
          })


          
       }
}



export default HealthProvider ;