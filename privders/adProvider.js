import AdsController from "../controllers/AdsController.js";
import AdService from "../services/AdService.js";
import ServiceProvider from "./ServiceProvider.js";



class AdProvider extends ServiceProvider {


    constructor(container){
         super(container)
    }



    register(){


         

          
          this.container.bind("adService",() => {
               const  orm = this.container.resolve("orm")
               return new AdService(orm)
        })

        this.container.bind("ads",() => {
               const adService = this.container.resolve("adService")
               return new AdsController(adService)
        })


         
          

    }

}




export default AdProvider