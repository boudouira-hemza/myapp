import express from "express";
import ormProvider from "./privders/ormProvider.js";
import blogProvider from "./privders/blogProvider.js";
import Container from "./containers/container.js";
import dbProvider from "./privders/dbProvider.js";
import application from "./bootstrap/application.js";
import PostController from "./controllers/postController.js";







const app = express()
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



app.listen(3000,() => {
       console.log("server running");
       
})






const myapp = new application()
      myapp.load()

    





app.get('/', async (req,res) => {
       
   const post =   myapp.container.resolve("posts")
     const result =   await post.all()
           return res.json(result)
    
})

 



app.get("/posts/:id", async (req,res) => {
      const post = myapp.container.resolve("posts")

     const data = await  post.find(req,res)
           return data 
})




app.post("/posts/create", async (req,res) => {
        const post = myapp.container.resolve("posts");

        const create = await post.create(req,res)

        return create 
                 
            
})


app.post("/posts/update/:id", async (req,res) => {
        const post = myapp.container.resolve("posts");
    
               
           
      
              
              const create = await post.update(req,res)
              return create ;
                 
            
})






   
   









 
    

    
  




     
  
    

    
     
     


     
           

 

      

      
     
    

 





