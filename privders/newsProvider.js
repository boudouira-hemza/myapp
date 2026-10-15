import NewsController from "../controllers/newsController.js";
import ServiceProvider from "./ServiceProvider.js";


class NewsProvider extends ServiceProvider {

       constructor(container){
          super(container)
       }


       

       register(){
          this.container.bind("news",() => {
               const blog = this.container.resolve("blog");
               return   new NewsController(blog)
          })
       }

}




export default NewsProvider ;