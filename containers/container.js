

class Container  {

         constructor(){
              this.bindings = new Map()
             
              
         }
        bind(key,action){
           return   this.bindings.set(key,action)
        }


        resolve(key){

              if(! this.bindings.has(key)){

                return Error(`${key} not found`)
              }
              return this.bindings.get(key)()
        }






}


export default Container