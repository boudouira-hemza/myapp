import Container from "../containers/container.js";
import register from "./register.js";


class Application {

    constructor(){
          this.container = new Container()
          this.providers = []
    }


    addProvider(provider){
             this.providers.push(new provider(this.container))
    }

    registerProviders(){
         for(const providerClass of this.providers){
                 providerClass.register()
         }
    }


    boot(provider){
       this.addProvider(provider)
       this.registerProviders()
    }

    load(){
        
     for(const reg of register){
             this.boot(reg)
     }
    }





                   
         
    

 




}




export default Application