

import path from "path"


class EmailWorkerService {

  constructor(queue,mailSerivce,orm,storage){
       this.queue = queue
       this.mailSerivce = mailSerivce
       this.orm = orm ;
       this.storage = storage
  }

  //  const  link = `<a href="http://localhost:5173/${payload.payload.category}/${payload.payload.id}">read more</a>`
     

   async run(){
     const [job_status] =  await this.queue.findJob("sent_blog_email","pending")
      const emails = await this.orm.get("emails")


      if(! job_status.length){
        // console.log("no email job found...")
        return

      }

 
    
 
    //  console.log(job_status)

      for( const job of job_status){
               
          try {
              const post =  await this.orm.find(job.payload.category,job.payload.id)


      
              
              

             




             await this.queue.updateJob(job.id,{
                status:"processing",
                attempts: job.attempts + 1 
              })

              
             const filename = path.basename(post[0].img)

            const  imgPath = this.storage.getPath(filename)

            const attachments = [
              {
                 filename:filename,
                 path:imgPath,
                 cid:"post-image"
              }
            ]
        
            const  link = `http://localhost:5173/${job.payload.category}/${job.payload.id}`
            const  body = this.mailSerivce.mailBody(post[0],link)
               
               console.log("email processing")

              for(const email of emails){
                  await  this.mailSerivce.send(
                       email.email,
                       post[0].title,
                       body,attachments
                       
                      )
              }

              console.log("email sent.....")

              await this.queue.updateJob(job.id,{
                status:"completed",
                attempts: job.attempts + 1
                
              })

              console.log("email completed")
           


          } catch (error) {
                 console.log(error)
          }



      }



         

   


        
     
           
  }




}



export default EmailWorkerService
