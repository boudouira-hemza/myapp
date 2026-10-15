import express from "express";

import application from "./bootstrap/application.js";

import cors from "cors"
import upload from "./middleware/upload.js";
import cookieParser from "cookie-parser";
import path from "path";

// import webpush from "web-push"
// import { title } from "process";
// import { log } from "console";





const app = express()
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
      origin:  process.env.CLIENT_URL,
      credentials:true
}))






app.use(cookieParser())


const router = express.Router()

app.use(upload.single("img"))

app.use("/storage/images",express.static(path.join(process.cwd(),"storage","images")))



app.use(router)

app.listen(3000,() => {
       console.log("server running");

})

console.log("CLIENT_URL =", process.env.CLIENT_URL);
console.log("APP_URL =", process.env.APP_URL);
console.log(
    "JWT_SECRET_TOKEN exists =",
    !!process.env.JWT_SECRET_TOKEN
);

const myapp = new application()
      myapp.load()




















// --------------Dashboard------------------------




router.get('/posts', async (req,res) => {

   const post =   myapp.container.resolve("posts" )

  return post.all(req,res)
})





router.get("/posts/:id", async (req,res) => {

           const post = myapp.container.resolve("posts")
           const data = await  post.find(req,res)
           return data
})

router.post("/posts/create", async (req,res) => {



        const post = myapp.container.resolve("posts");

        const create = await post.create(req,res)

        return create


})
































router.post("/posts/update/:id", async (req,res) => {
        const post = myapp.container.resolve("posts");
              const create = await post.update(req,res)
              return create ;


})

router.delete("/posts/destroy/:id", async (req,res) => {
           const post = myapp.container.resolve("posts")
           return  post.destroy(req)

})



// ---------------------End-----Dashboard------------------------------





// --------------Authentication-------------------------































router.post("/login", async (req,res) => {
         const result = await myapp.container.resolve("authController")

          return result.login(req,res)
})

router.post("/logout", async (req,res) => {
         const result = await myapp.container.resolve("authController")
          return result.logout(req,res)
})

router.post("/refresh",(req,res) => {
          const result = myapp.container.resolve("authController")
                return result.refresh(req,res);
})

router.post("/reset-password",(req,res) => {
        const result = myapp.container.resolve("authController")
        return result.resetPassword(req,res)
})


router.post("/verify-reset-password",(req,res) => {
        const result = myapp.container.resolve("authController")
        return result.verifyResetPasswordToken(req,res)
})




router.post('/forgot-password',(req,res) => {
         const result = myapp.container.resolve("authController")
         return result.forgotPassword(req,res) ;
})


router.get('/me',async (req,res) => {
       const result = myapp.container.resolve("authController")
             return  await result.me(req,res)
})











// // --------------------END-Authentication----------------------------





// //  -----------------NEWS--------------------------------------------


router.get('/news', async(req,res) => {
         const news = myapp.container.resolve("news");
              return news.all(req,res)

})




router.get('/news/:id', async(req,res) => {
         const news = myapp.container.resolve("news");
              return news.find(req,res)

})

router.post('/news/create', async(req,res) => {
         const news = myapp.container.resolve("news");
              return news.create(req,res)

})


router.post('/news/update/:id', async(req,res) => {
         const news = myapp.container.resolve("news");
              return news.update(req,res)

})


router.delete('/news/destroy/:id', async(req,res) => {
         const news = myapp.container.resolve("news");
              return news.destroy(req)

})




// // -------------END-NEWS---------------------------


// // --------------------LifeStyle---------------------



router.get('/lifestyle',(req,res) => {
         const life = myapp.container.resolve("lifestyle");
         return life.all(req,res)

})





router.get('/lifestyle/:id',(req,res) => {
           const post = myapp.container.resolve("lifestyle");

              return post.find(req,res)

})

router.post('/lifestyle/create',(req,res) => {
         const life = myapp.container.resolve("lifestyle");
         return life.create(req,res)

})

router.post('/lifestyle/update/:id',(req,res) => {
         const life = myapp.container.resolve("lifestyle");
              return life.update(req,res)

})

router.delete('/lifestyle/destroy/:id',(req,res) => {
         const life = myapp.container.resolve("lifestyle");
              return life.destroy(req)
})





// ______________________________AFFILIATE____________________________




router.get("/banners", async (req,res) => {


           const banner = await  myapp.container.resolve("ads")
           return  banner.getBanners(req,res)
})



router.post("/add-banner/create", async (req,res) => {

           console.log(req.body)
           const banner = await  myapp.container.resolve("ads")
           return  banner.createAd(req,res)
})



router.delete("/banner/destroy/:id",(req,res) => {


           const banner = myapp.container.resolve("ads")

           return banner.removeAd(req,res)

})









//  -----------------END----LifeStyle--------------------




// ------------------Travel-------------------------------



router.get("/travel", async (req,res) => {
        const travel =  await myapp.container.resolve("travel")
              return travel.paginate(req,res)  ;
})

router.get("travel/:id", async (req,res) => {
        const travel =  await myapp.container.resolve("travel")
              return travel.find(req,res)  ;
})

router.post("/travel/create", async (req,res) => {
        const travel =  await myapp.container.resolve("travel")
              return travel.create(req,res)  ;
})


router.post("/travel/update/:id", async (req,res) => {
        const travel =  await myapp.container.resolve("travel")
              return travel.update(req,res)  ;
})

router.delete("/travel/destroy/:id", async (req,res) => {
        const travel =  await myapp.container.resolve("travel")
              return travel.destroy(req)  ;
})


// // -------------------END--Travel-------------------------


// //-----------------Health---------------------------------


router.get("/health", async (req,res) => {
        const health =  await myapp.container.resolve("health")

        return health.all(req,res) ;
})

router.get("/health/:id", async (req,res) => {
        const health =  await myapp.container.resolve("health")
              return health.find(req,res) ;
})

router.post("/health/create/", async (req,res) => {
        const health =  await myapp.container.resolve("health")
              return health.create(req,res) ;
})

router.post("/health/update/:id", async (req,res) => {
        const health =  await myapp.container.resolve("health")
              return health.update(req,res) ;
})

router.delete("/health/destroy/:id", async (req,res) => {
        const health =  await myapp.container.resolve("health")
              return health.destroy(req) ;
})





// // ---------------------END-Health---------------------------



// // -------------------Sports--------------------------------

router.get("/sports", async (req,res) => {
        const sports=  await myapp.container.resolve("sports")

              return sports.all(req,res) ;
})

router.get("/sports/:id", async (req,res) => {
        const sports=  await myapp.container.resolve("sports")

        return sports.find(req,res) ;
})


router.post("/sports/create", async (req,res) => {
        const sports=  await myapp.container.resolve("sports")

              return sports.create(req,res) ;
})


router.post("/sports/update/:id", async (req,res) => {
        const sports=  await myapp.container.resolve("sports")

              return sports.update(req,res) ;
})



router.delete("/sports/destroy/:id", async (req,res) => {


        const sports=  await myapp.container.resolve("sports")

              return sports.destroy(req)
})




// //  ------------------END--Sports---------------------------------


// // ----------------------------Category --------------------------


router.get("/category",  (req,res) => {
          const result =  myapp.container.resolve("category")


          return   result.all(req,res)
})





router.post("/subscribe/push",(req,res) => {

          const result = myapp.container.resolve("pushController")
               return result.subscribe(req,res)


})


router.post("/unsubscribe/notify",(req,res) => {

      const result = myapp.container.resolve("pushController")
      return result.unsubscribe(req,res)


})







const pushWorker =
    myapp.container.resolve("push_worker")

//     const email = myapp.container.resolve("email_worker")

pushWorker.run()
//     setInterval(() => {},5000)












// -------------------END-Category--------------------------------


app.use((req, res) => {
    res.status(404).json({
        error: "Page not found"
    });
})
























