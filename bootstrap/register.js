
import AuthProvider from "../privders/authProvider.js";
import blogProvider from "../privders/blogProvider.js";
import dbProvider from "../privders/dbProvider.js";
import HealthProvider from "../privders/healthProvider.js";
import LifestyleProvider from "../privders/lifestyleProvider.js";
import MailProvider from "../privders/mailProvider.js";
import NewsProvider from "../privders/newsProvider.js";
import ormProvider from "../privders/ormProvider.js";
import PostProvider from "../privders/postProvider.js";
import SportsProvider from "../privders/sportsProvider.js";
import TravelProvider from "../privders/travelProvider.js";
import StorageProvider  from "../privders/storageProvider.js"
import QueueProvider from "../privders/queueProvider.js";
import EmailWorkerProvider from "../privders/emailWorkerProvider.js";
import PushProvider from "../privders/pushProvider.js";
import PushWorkerProivder from "../privders/pushProviderWorker.js";
import AdProvider from "../privders/adProvider.js";


export default       [

        dbProvider ,
        ormProvider ,
        blogProvider,
        PostProvider,
        NewsProvider,
        AuthProvider,
        LifestyleProvider,
        HealthProvider,
        SportsProvider,
        TravelProvider,
        MailProvider,
        StorageProvider,
        QueueProvider,
        EmailWorkerProvider,
        PushProvider,
        PushWorkerProivder,
        AdProvider




]



