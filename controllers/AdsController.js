

class AdsController {

     constructor(ads){
         this.ads = ads
     }


   async getBanners(req,res){
      const data =  await  this.ads.all("affiliate")
      

    //   if(!data.length){
         
    //   }

      return res.json({
         status:"ok",
         data:data
      })
   }



   async  createAd(req,res){


        const banner = {

            company_name:req.body.company_name,
            affiliate_url:req.body.affiliate_url,
            image_url: req.body.image_url,
            categorie_id:req.body.categorie_id,
             
        }


        

          const data =  await  this.ads.createAd("affiliate",banner)



          return res.json({
             result:"ok",
             message:" add created successffully",
             data: data
          })

            
     }


    async  removeAd(req,res){
          return await  this.ads.removeAd("affiliate",req.params.id)

     }



}



export default AdsController