
import lifestyleController from "../controllers/lifestyleController.js";
import ServiceProvider from "./ServiceProvider.js";

class LifestyleProvider extends ServiceProvider {

       constructor(container){
           super(container)
       }


       register(){
         
          this.container.bind('lifestyle',() => {
              
             const blog = this.container.resolve("blog")
        
              return new lifestyleController(blog) 
          })


          
       }
}



export default LifestyleProvider ;