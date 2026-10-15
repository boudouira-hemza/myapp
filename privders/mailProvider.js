import MailService from "../services/mailService.js";
import ServiceProvider from "./ServiceProvider.js";


class MailProvider extends ServiceProvider {


    constructor(container){
           super(container)
    }

    register(){

        this.container.bind("mail",() => {
              const orm = this.container.resolve("orm")
              return new MailService(orm)
        })
    }



}



export default MailProvider