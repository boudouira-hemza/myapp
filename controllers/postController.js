

class PostController {

      constructor(blog){
         this.blog = blog

      }

     async all(req,res) {
         const post =  await this.blog.all("posts")
         const travel = await this.blog.all("travel")
         const lifestyle = await this.blog.all("lifestyle")
         const sports = await this.blog.all("sports")
         const health = await this.blog.all("health")
         const news = await this.blog.all("news")
         const posts = {
             post:post ,
             travel:travel,
             lifestyle:lifestyle,
             sports:sports,
             health:health,
             news:news
         }




           return res.json(posts)
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
           const result = await this.blog.paginate("posts",limit,offset)
           return res.json(result

           )
     }


     async create(req,res){

          const image = await this.blog.storage.save(req.file)
        //   console.log(image)



         const post = {
             title: req.body.title,
             content: req.body.content ,
             footer:req.body.footer,
             categorie_id: req.body.categorie_id ,
             img: image.url,
             mimetype: req.file.mimetype,
         }



        const   result =   await this.blog.create("posts",post)



                          await  this.blog.queue.createJob("sent_blog_email",{
                                id:result.insertId,
                                category:"posts",
                           })

                          await  this.blog.queue.createJob("push_notification",{
                                id: result.insertId ,
                                category:"posts"
                           })





         return   res.json({
                 data:result
            })


      }


    async update(req,res){

        console.log("posts bosdy: " , req.body)

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
      async  destroy(req){
            return   await  this.blog.destroy("posts",req.params.id)
        }



    async  createTable(columns){

             columns = {
               id :"INT UNSIGNED AUTO_INCREMENT PRIMARY KEY",
               title :"VARCHAR(255) NOT NULL",
               content :"TEXT NOT NULL",
               img: "VARCHAR(255) NOT NULL",
               mimetype: "VARCHAR(50)",
               created_at: "timestamp default  current timestamp",
               updated_at: "timestamp default on update current timestamp",
             }


            const result = await  this.blog.createTable("posts", columns)
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


export default PostController ;
