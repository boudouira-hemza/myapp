
class NewsController {

      constructor(blog){
         this.blog = blog 
      }

    async all(req,res) {
         const post =  await this.blog.all("news")
         
         
            
            return res.json(post)
       }


    async create(req,res){
         const image = await this.blog.storage.save(req.file)
             
         const post = {
             title: req.body.title,
             content: req.body.content ,
             footer:req.body.footer,
             img: image.url,
             categorie_id: req.body.categorie_id,
             mimetype: req.file.mimetype,
         }
        const   result =   await this.blog.create("news",post)   
        
            await  this.blog.queue.createJob("sent_blog_email",{
            id:result.insertId,
            category:"news",
            })

            await  this.blog.queue.createJob("push_notification",{
            id: result.insertId ,
            category:"news"
            }) 
  
          
                 
         return   res.json({
                 data:result
            })
               
               
      }
    async paginate(req,res){
           const  page = Number(req.query.page) || 1
           const  limit = Number(req.query.limit) || 6

            if (!Number.isInteger(page) || page < 1) {
                return res.status(400).json({
                    result: "error",
                    message: "page must be a positive integer"
                });
            }

            if (!Number.isInteger(limit) || limit < 1) {
                return res.status(400).json({
                    result: "error",
                    message: "limit must be a positive integer"
                });
            }

           const offset = (page - 1 ) * limit 
           const result = await this.blog.paginate("news",limit,offset)
           return res.json(result)
     }


    async update(req,res){
          const image = await this.blog.storage.save(req.file)
        //   console.log(image)

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
             img: image.url,
             mimetype: req.file.mimetype,
          }
             
 

          const  result = await this.blog.update("news", req.params.id , data)
                 
                 
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
         const  result = await  this.blog.find("news",req.params.id)

                
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
      async  destroy(req){
            return  await  this.blog.destroy("news",req.params.id)
        }



    async  createTable(columns){
            
             columns = {
               id :"INT UNSIGNED AUTO_INCREMENT PRIMARY KEY",
               title :"VARCHAR(255) NOT NULL",
               content :"TEXT NOT NULL",
               img: "VARCHAR(255) NOT NULL",
               mimetype: "VARCHAR(255) NOT NULL",
               created_at: "timestamp default  current timestamp",
               updated_at: "timestamp default on update current timestamp",
             }
            

            const result = await  this.blog.createTable("news", columns)
            return result ;
      }

    async createDB(db){
        const result = await this.blog.createDB(db)
            return result ;
    }

    async useDB(db){
        const result = await this.blog.useDB(db)
            return result ;
    }





}


export default NewsController ;