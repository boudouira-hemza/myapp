import { json } from "express";


class orm_service {


    constructor(db){
          this.db = db
    }

    validateIdentifier(name) {

            if (
                  typeof name !== "string" ||
                  !/^[a-zA-Z_][a-zA-Z0-9_]*$/.test(name)
            ) {
                  throw new Error(`Invalid SQL identifier: ${name}`);
            }

            return name;
      }


   async  all(table){


       table = this.validateIdentifier(table)

      
                       const [rows ]=   await  this.db.query(` select * from  ${table}`) 
                       return rows
                  

    }

   async create(table , data){

         table = this.validateIdentifier(table)

         const keys = Object.keys(data).join(",")
         const values = Object.values(data);
               const placeholder = values.map(() => "?").join(",")    
              const [result] = await this.db.query( ` insert into ${table} (${keys}) values(${placeholder}) `, values )
                    return result ;

        
    }


   async update(table, id, data) {
            table = this.validateIdentifier(table)

            const keys = Object.keys(data);
            const values = Object.values(data);

            const set = keys
                  .map(key => `${key} = ?`)
                  .join(", ");

            const sql = `
                  UPDATE ${table}
                  SET ${set}
                  WHERE id = ?
            `;

            const result = await this.db.query(
                  sql,
                  [...values, id]
            );

            

            return result ;
}


  async   destroy(table , id){

       table = this.validateIdentifier(table)

       const result =  await  this.db.query(`DELETE FROM ${table} where id = ?`,[id])
       return result ;
          
    }


   async find(table , id){

        table = this.validateIdentifier(table)
        const [result] = await this.db.query(`select * from ${table} where id = ?`, [id])
              
              
              return result ;
    }

}



export default orm_service