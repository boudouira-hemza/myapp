import Blog from "../services/blog_service.js";
import ServiceProvider from "./ServiceProvider.js";


class blogProvider extends ServiceProvider {
       
     constructor(container){
        super(container)
     }

       register(){
          this.container.bind("blog",() => {  
                const orm = this.container.resolve("orm")
              return   new Blog(orm)
          })
       }


}



export default  blogProvider ;