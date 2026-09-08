import PostController from "../controllers/postController.js";
import ServiceProvider from "./ServiceProvider.js";


class PostProvider extends ServiceProvider {

     constructor(container){
          super(container)
     }


     register(){
          this.container.bind("posts",() => {
              const blog =  this.container.resolve("blog");
               return new PostController(blog)
          })
     }
}


export default PostProvider