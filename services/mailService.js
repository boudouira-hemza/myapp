import nodemailer  from "nodemailer"

class MailService {

      constructor(orm){
           this.orm = orm
           this.transporter = nodemailer.createTransport({
             host:"172.27.188.39",
             port:25,
             secure:false
            })


      }

   async getEmails(){
        const  [emails] =  await this.orm.all("emails")
         
               
               return emails

   }


   async send(to , subject , html , attachments=[]){




             
             const  mail =   await this.transporter.sendMail({
            
             from:  `<${process.env.JWT_USER_MAIL}>` ,
             to: to,
             subject:subject,
             html:html,
             attachments
              
              })

            // this.transporter.verify()
            // .then(() => console.log("smtp sended successfully"))
            // .catch((err) => console.log(`smtp failed ${err}`))
           
               // console.log("sending emails...");
               
              
            //  console.log(mail)


             return mail 
    }

    mailBody(post , link){
      return `

            <!DOCTYPE html>
            <html lang="en">
            <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            </head>
            <body>
                 <a href=${link} style="font-size:16px; text-decoration:none;">read more....</a>
                 <main style=" display:block; width:400px;height:400px; max-width:100%; object-fit:cover;">
                        <h1>${post.title}</h1>
                        <img src="cid:post-image" >
                        
       
                 </main>
                 <br>
            </body>
            </html>

      
      `
   }




}



export default MailService



