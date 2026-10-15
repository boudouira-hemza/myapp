
class PushService {

    constructor(push){
          this.push = push
    }




   async sendNotification(subscribtion,data){      
    
            
        
             await  this.push.sendNotification(subscribtion,JSON.stringify(data))

              console.log("push sending")

             
      
    



}

   
    



}


export default PushService