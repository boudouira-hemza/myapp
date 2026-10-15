
import SportsController from "../controllers/sportsController.js";
import ServiceProvider from "./ServiceProvider.js";



class SportsProvider extends ServiceProvider {

       constructor(container){
          super(container)
       }


       

       register(){
          this.container.bind("sports",() => {
               const blog = this.container.resolve("blog");
               return    new SportsController(blog)
          })
       }

}




export default SportsProvider ;