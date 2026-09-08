
class Blog {
   

      constructor(orm){
         this.orm = orm
      }


      async all(table){
         const result =  await this.orm.all(table)
         return result ;
           
      }

      async create(post) {
        return await this.orm.create("posts", post);
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
                console.log(row);
                
                return row ;
      }





}



export default Blog 