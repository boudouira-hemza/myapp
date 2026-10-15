
class QueueService  {


     constructor(orm){
          this.orm = orm
     }


    async createJob(job_name,payload) {

     

        const job = {
             job_name:job_name,
             payload:JSON.stringify(payload),           
             status:"pending",
        }

        
          
     const result = await this.orm.create("jobs",job)   
           
              
           return result ;  
           
           
    }


   async findJob(job_name,status){
      return  await this.orm.findWhere("jobs",{ job_name:job_name,status:status})
    }

    async updateJob(id , data){
        
              
         return await     this.orm.update("jobs",id,data)

    }


  

}


export  default QueueService