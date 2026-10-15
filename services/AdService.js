

class AdService {

    constructor(orm){
        this.orm = orm 
    }


    async all(table){
         return await this.orm.all(table)
    }


   async  createAd(table,data){
       const banner =  await   this.orm.create(table,data)
       return  banner
    }

   async removeAd(table,id){
       return await this.orm.destroy(table,id)
   }


   async destroy(req){

   }


}



export default AdService



