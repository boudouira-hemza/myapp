import PushController from "../controllers/pushController.js";
import PushService from "../services/pushservice.js";
import ServiceProvider from "./ServiceProvider.js";
import webpush from "web-push"

class PushProvider extends ServiceProvider {

    constructor(container){
         super(container)
    }

    register(){

         this.container.bind("push",() => {
              webpush.setVapidDetails("mailto:hemza@gmail.com",process.env.VAPID_PUBLIC_KEY,process.env.VAPID_PRIVATE_KEY)
              return webpush
         })

         this.container.bind("pushController",() => {
                 const orm = this.container.resolve('orm')
                 return new PushController(orm)
         })

         this.container.bind("pushService",() => {
               const push = this.container.resolve("push")
               return new PushService(push)
         })

      


    }

}


export default PushProvider