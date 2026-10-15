
class CategoryController {

      constructor(blog){
         this.blog = blog 
      }

     async all(req,res) {
         const category =  await this.blog.get("category")    
         return res.json(category)
       }



      async create(req,res){
             
         const post = {
             categorie_name: req.body.categorie_name,

         }

        const   result =   await this.blog.create("category",post)  
                 
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
             title:req.body.categorie_name ,
          }
             
 

          const  result = await this.blog.update("category", req.params.id , data)
                 
                 
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














}


export default CategoryController ;