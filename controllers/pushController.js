

class PushController{

    constructor(orm){
        this.orm = orm
    }




   async subscribe(req,res){


        const data = {
              endpoint: req.body.endpoint,
              p256dh: req.body.keys.p256dh,
              auth: req.body.keys.auth
        }
      return  await this.orm.create( "push_notification",data)
    }


   async unsubscribe(req,res){
            const {endpoint} = req.body
           const result = await  this.orm.destroyWhere("push_notification","endpoint",endpoint)
           return res.json({
             message:  "push notification deleted",
             endpoint: endpoint 
           })
    }


    



}


export default PushController