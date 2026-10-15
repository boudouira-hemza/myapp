import QueueService from "../services/queueService.js"
import ServiceProvider from "./ServiceProvider.js"


class QueueProvider extends ServiceProvider {

    constructor(container){
         super(container)
    }


    register(){
        this.container.bind('queue',() => {

               const orm = this.container.resolve('orm')
              
              return new QueueService(orm)
        })
    }
      
}

export default QueueProvider