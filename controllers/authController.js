import jwt from "jsonwebtoken" 
import crypto from "crypto";
// import nodemailer from "nodemailer";





class authController {

      constructor(auth,mail){
         this.auth = auth ;
         this.mail = mail
      }




      

    async  login(req,res){
   
         const result = await this.auth.login("users", req.body.email,req.body.password)


     
  
    
         if( result == null){
             return res.json({
             result:"false",
             data: " wrong email or password ..."


         })      
         }
        
         res.cookie("accessToken",result.accessToken , {
          httpOnly:true,
          maxAge: 15 *  60  * 1000 
         })

         res.cookie("refreshToken",result.refreshToken,{
          httpOnly:true,
          maxAge:7 *  24 * 60 * 60  * 1000
         })


        


         return res.json({result:"ok", data: result.user})
              
      }

    async  logout(req,res){
        return await this.auth.logout(req,res)
    }


    async refresh(req,res){
          
      const result = await this.auth.refresh(req,res)

            return result 
          
    }

    async me(req,res) {

        const token = req.cookies.accessToken ;

   





              
               
              if(!token ){
                return  res.status(401).json("not authenticated")
              }

              try {

                          const decoded = jwt.verify(token,process.env.JWT_SECRET_TOKEN)
         
                          const user = {
                            id: decoded.id,
                            username: decoded.username,
                            email:decoded.email
                          }


                          return res.json({
                            result:"ok",
                            data:user
                          })

                
              } catch (error) {
                 return res.status(401).json({
                     result:"false",
                     data:"invalid token"
                 })
              }



              






    }


    async forgotPassword(req,res){
     
        const  [result] = await this.auth.findByEmail("users",req.body.email)
        const token = crypto.randomBytes(32).toString("hex")


        if(!result){
             return res.json({
               data:" email does not exist..."
             })
        }

                  
        const  id = result.id
        const  email = result.email
        const expired_at  = new Date(Date.now() + 15 * 60 * 1000)
        

        const genereateAndInsertToken =  await this.auth.create("password_reset_tokens",{
           user_id:id,
           token:token,
           expires_at: expired_at
        })

         const sentUrl = `http://localhost:5173/reset-password?token=${token}`


         await  this.mail.send(email,"subject",` click here to reset your password: ${sentUrl}`)

        if(genereateAndInsertToken.affectedRows === 1){
           return  res.json({
               result: "ok",
               message:"password link sent"
            })
        }



      
           
                  
           
    }



    async resetPassword(req,res){

         const  resetPassword = req.body.password

         const email = req.body.email
     
   
         
          
          const result = await this.auth.resetPassword("users",email,resetPassword)

          if(result.affectedRows === 1){
                      return res.json({
                      result:"ok",
                      data:"password updated successfully"
          })

          }
          


    }


  async verifyResetPasswordToken(req,res){

           

          const token = req.body.token

          
        
          const result = await this.auth.verifyResetPasswordToken(token)

         if(!result.length){
           return  res.json({
              result:"false",
              data:"invalid or expired token ... "
           })
         }


         
         return res.json({
           result:"ok",
           data: "success",
           payload: result[0]
         })
  }
  

    async  createTable(columns){

                      columns = {
               id :"INT UNSIGNED AUTO_INCREMENT PRIMARY KEY",
               title :"VARCHAR(255) NOT NULL",
               content :"TEXT NOT NULL",
               img: "VARCHAR(255) NOT NULL",
               categorie_id: "int not null",
               created_at: "timestamp default  current timestamp",
               updated_at: "timestamp default on update current timestamp",
             }
            

            const result = await  this.auth.createTable("news", columns)
            return result ;
      }

    














}


export default authController ;