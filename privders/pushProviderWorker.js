import PushNotificationWorkerService from "../workers/push.worker.js";
import ServiceProvider from "./ServiceProvider.js";


class PushWorkerProivder extends ServiceProvider {


     constructor(container){

        super(container)
     }


     register(){

         this.container.bind("push_worker",()=> {
                const queue = this.container.resolve("queue")
                const orm = this.container.resolve("orm")
                const pushService = this.container.resolve("pushService")

               
                
                return new PushNotificationWorkerService(queue,orm,pushService)
         })
     }

}


export default PushWorkerProivder 