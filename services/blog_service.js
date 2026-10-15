
class Blog {


      constructor(orm,storage,queue){
         this.orm = orm
         this.storage = storage
         this.queue = queue

      }


      async all(table){
         const result =  await this.orm.all(table)

         return result ;

      }


      async get(table){

         const result = await this.orm.get(table)
         return result

      }



      async create(table , post) {


       const result =  await this.orm.create(table, post);
       return result ;

      }

      async paginate(table,limit,offset){
          const result = await this.orm.paginate(table,limit,offset)
          return result
      }


      async update(table , id ,data){
          const [update] =     await this.orm.update(table,id,data)

                return update ;

      }


     async  destroy(table,id){
        return await  this.orm.destroy(table,id)
      }


      async find(table,id){
          const row = await this.orm.find(table,id)
                return row ;
      }


      async createTable(table,columns){
         const result = await  this.orm.createTable(table,columns);
         return result ;
      }

      async createDB(db){
         const result = await  this.orm.createDB(db);
         return result ;
      }

      async useDB(db){
         const result = await  this.orm.useDB(db);
         return result ;
      }






}



export default Blog
