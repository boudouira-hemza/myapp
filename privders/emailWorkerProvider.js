
import EmailWorkerService from "../workers/email.worker.js";
import ServiceProvider from "./ServiceProvider.js";


class EmailWorkerProvider extends ServiceProvider{
      constructor(container){
           super(container)
      }

    register(){
   
          this.container.bind('email_worker',() => {
              const queue = this.container.resolve("queue")
              const mailSerivce = this.container.resolve("mail")
              const orm = this.container.resolve("orm")
              const storage = this.container.resolve("storage")
              return new  EmailWorkerService(queue,mailSerivce,orm,storage)
          })

    }

}



export default EmailWorkerProvider