import blogProvider from "../privders/blogProvider.js";
import dbProvider from "../privders/dbProvider.js";
import ormProvider from "../privders/ormProvider.js";
import PostProvider from "../privders/postProvider.js";

export default       [

        dbProvider ,
        ormProvider ,
        blogProvider,
        PostProvider

]



