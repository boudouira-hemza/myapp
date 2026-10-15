import jwt from "jsonwebtoken";



class authService {

     constructor(orm){
          this.orm = orm 
     
     }



async   login(table, email,password){
         const result =  await this.orm.login(table,email,password)

             if (result.length === 0) {
                return null;
              }
         
         
         const user = result[0]

           
           
         
         
         const accessToken = jwt.sign({
            id:user.id,
            email:user.email,
            username:user.username
         },process.env.JWT_SECRET_TOKEN,{expiresIn:"15min"})

         const refreshToken = jwt.sign({
            id:user.id,
            email:user.email,
            username:user.username

         },process.env.JWT_REFRESH_TOKEN,{expiresIn:"7d"})

         return {
           user , accessToken , refreshToken
         }


     }
async refresh(req,res){ 
   
     //     console.log("____________________refresh_Token______________")

     
            try {

                         const refreshToken = req.cookies.refreshToken ;

                       
                         

                         const decoded = jwt.verify(refreshToken,process.env.JWT_REFRESH_TOKEN)

                         // console.log("decoded: ", decoded)
                         
               
                         
                         const id   = decoded.id 
                         const email = decoded.email
                         const username = decoded.username 

                         const NewAccessToken  = jwt.sign({
                              id: id,
                              email:email,
                              username:username
                              },process.env.JWT_SECRET_TOKEN ,{expiresIn:"15min"} )
                              res.cookie("accessToken", NewAccessToken, {
                              httpOnly: true,
                              maxAge: 15 * 60 * 1000
                              });

                              // console.log("New ACCESS TOKEN",NewAccessToken)

                              return   res.json({
                                   result:"ok",
                                   data:{
                                         id:id,                                   
                                         email:email,
                                         username: username,
                                         accessToken:NewAccessToken
                                   }
                              })

                           


               
            } catch (error) {

               return res.status(401).json({
                    result:"false",
                    data:" invalid data"
               })
               
            }

          
     }
async resetPassword(table , email ,password){
         const  result =  await this.orm.resetPassword(table,email,password)
                return result;
    }
 async verifyResetPasswordToken(token){
        const result = await this.orm.verifyResetPasswordToken("password_reset_tokens",token)
        return result;
  }

     


async   logout(req,res){

           const accessToken = req.cookies.accessToken
           const refreshToken = req.cookies.refreshToken

           if(refreshToken != undefined && accessToken != undefined){
                  res.clearCookie("accessToken")
                  res.clearCookie("refreshToken")  
           }



          return res.json({
                result:"ok",
                data:"logged out"
           })

      }


async findByEmail(table,email) {
        const result = await this.orm.findByEmail(table,email)
              return result;
   }

async create(table,columns){

     const result = await this.orm.create(table,columns)
     return result
        
   }




     async    createTable(table,columns){
               
          const result = await this.orm.createTable(table,columns)
          return result ;
     }







}



export default authService ;