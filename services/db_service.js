 import "dotenv/config";

import mysql2  from  "mysql2/promise"

class db {

       constructor(){


          this.conn =   mysql2.createPool({
              host: process.env.DB_HOST,
              user: process.env.DB_USER,
              password: process.env.DB_PASSWORD,
              database: process.env.DB_NAME

          })

       }

       async query(sql,params = []){
           const result =  await this.conn.query(sql,params)
                 return result ;
       }


      async login( table ,email,password){
          const [result] =  await this.query(`select * from ${table} where email = ?  and password = ? `,[email,password])
          return result ;
       }





       async createTable(table,columns){

            const obj = Object.entries(columns)

            const fields = obj.map(([key,value]) => {
                return `${key} ${value}`;
            }).join(",")





            const result = await  this.query(`create table if not exists ${table} (${fields}) ;`)
                return result ;
            }


        async createDB(db){
                    const result = await this.query(`create  database  if not exists ${db} ;`)
                    return result
                }
        async useDB(db){
                    const result = await this.query(` use ${db}`);
                    return result;
            }




}



export default db
