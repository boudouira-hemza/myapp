
class PostController {

      constructor(blog){
         this.blog = blog 
      }

     async all() {
         const posts =  await this.blog.all("posts")
         return  posts 
      }


      async create(req,res){

             
         const post = {
             title: req.body.title,
             content: req.body.content ,
             img: req.body.img
         }
   

        const   result =   await this.blog.create(post)      
                 
         return   res.json({
                 data:result
            })
               
               
      }


       async update(req,res){

        const id = Number(req.params.id)
         
           if(!Number.isInteger(id) || id <= 0 ){
                 res.json({
                    result:"false",
                    data:"post not found"
                 })
           }

          const data = {
             title:req.body.title ,
             content: req.body.content,
             img: req.body.img
          }
             
 

          const  result = await this.blog.update("posts", req.params.id , data)
                 
                 
                 if(result.affectedRows === 0){
                     return res.json({
                         result:"false",
                         data:" bad request "
                      })
                 }
          
          return res.json({
             result:"ok",
             data: result 
          })

          

      }


      async find(req,res){
         const  result = await  this.blog.find("posts",req.params.id)

                
                 const id = Number(req.params.id)
                 
                                 
                 if(result.length === 0 || !Number.isInteger(id) ){
                     return res.json({
                         result:"false",
                         data:" bad request "
                      })
                 }
                        
               return res.json({
                   result:"ok",
                   data:result
               })
      }


}


export default PostController ;