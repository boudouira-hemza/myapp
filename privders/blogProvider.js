import CategoryController from "../controllers/CategoryController.js";
import Blog from "../services/blog_service.js";
import ServiceProvider from "./ServiceProvider.js";


class blogProvider extends ServiceProvider {

     constructor(container){
        super(container)
     }

       register(){



          this.container.bind("blog",() => {
                const orm = this.container.resolve("orm")
                const storage = this.container.resolve("storage")
                const queue   = this.container.resolve("queue")

                return   new Blog(orm,storage,queue)
          })

           this.container.bind("category",() => {
               const blog = this.container.resolve("blog")
               return new CategoryController(blog)
          })
       }


}



export default  blogProvider ;
