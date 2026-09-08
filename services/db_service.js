

import mysql2  from  "mysql2/promise"
class db {

       constructor(){

          this.conn =   mysql2.createPool({ 
              host:"localhost",
              user:"root",
              password:"Hemza1993@",
              database:"blog",
              
          })
        
       }

       async query(sql,params = []){
           return await this.conn.query(sql,params)
       }



}



export default db