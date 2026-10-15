import TravelController from "../controllers/travelController.js";
import ServiceProvider from "./ServiceProvider.js";

class TravelProvider extends ServiceProvider {

       constructor(container){
           super(container)
       }


       register(){
         
          this.container.bind('travel',() => {
              
             const blog = this.container.resolve("blog")
        
              return new TravelController(blog) 
          })


          
       }
}



export default TravelProvider ;