import authController from "../controllers/authController.js";
import authService from "../services/authService.js";
import ServiceProvider from "./ServiceProvider.js";

class AuthProvider extends ServiceProvider {

       constructor(container){
           super(container)
       }


       register(){
         
          this.container.bind('auth',() => {
              const orm = this.container.resolve("orm");   
              return new authService(orm) 
          })

          



          this.container.bind('authController',() => {
               const auth = this.container.resolve("auth")
               const mail = this.container.resolve("mail")
               return new authController(auth,mail)
          })
          
       }
}



export default AuthProvider ;