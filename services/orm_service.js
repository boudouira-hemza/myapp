
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

     async  get(table){


       table = this.validateIdentifier(table)

      
                       const [rows ] =   await  this.db.query(` select * from  ${table}  order by id desc `) 
                       
                       return rows

                
    }

   async  all(table){


       table = this.validateIdentifier(table)

      
                  //      const [rows ] =   await  this.db.query(` select * from  ${table}  order by id desc `) 
                       
                  //      return rows

                  const [rows] = await this.db.query(`select ${table}.* ,  category.categorie_name as name from ${table}  inner join  category on category.id = ${table}.categorie_id order by ${table}.id desc`)
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
   async  destroyWhere(table,column,value){

       table = this.validateIdentifier(table)

       const result =  await  this.db.query(`DELETE FROM ${table} where ${column} = ?`,[value])
      //  return result ;

          
    }


   async find(table , id){

        table = this.validateIdentifier(table)
        const [result] = await this.db.query(`select * from ${table} where id = ?`, [id])
              
              
              return result ;
    }


    async findWhere(table , condition){

           const  keys = Object.keys(condition)
           const placeholder = keys.map((key) => `${key} = ? ` ).join("AND ")

           const values = Object.values(condition)
                    
                
           return  await this.db.query(`select * from ${table} where ${placeholder}   `, values)
    }


    async findByEmail(table,email){
         const  [result] = await this.db.query(`select * from ${table} where email = ?` , [email])
         return result ;
    }

   async login(table, email , password){
      //   email = this.validateIdentifier(email)
        const  result =  await this.db.login(table ,email,password)
        return result 

   }

   async resetPassword(table, email , password){
         const  [result] = await this.db.query(`update ${table} set password = ? where email = ?`,[ password , email])  
                return result 
    }

 async verifyResetPasswordToken(table , token){

           const [result] = await this.db.query(` select ${table}.* ,  
            users.email as email from ${table} inner join users on  ${table}.user_id = users.id  
            where ${table}.token = ? `,[token])
           return result
  }


   async paginate(table,limit,offset){
          table = this.validateIdentifier(table)
          const [result ]= await this.db.query(` select * from ${table} order by id desc limit ?  offset ? `,[limit,offset])
          return result
   }





   async createTable(table,columns){
       const result = await  this.db.createTable(table,columns)
             return result ;  
   }

   async createDB(db){
         const result = await this.db.createDB(db)
         return result  
      }
   async useDB(db){
        const result = await this.db.useDB(db)
              return result
   }
         

}



export default orm_service