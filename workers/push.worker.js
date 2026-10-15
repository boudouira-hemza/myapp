class PushNotificationWorkerService {

    constructor(queue, orm, pushService) {
        this.queue = queue
        this.orm = orm
        this.pushService = pushService
    }


    async run() {

        const [jobs] = await this.queue.findJob(
            "push_notification",
            "pending"
        )
 

        if (!jobs.length) {
            // console.log("no jobs....")
            return
        }


        for (const payload of jobs) {

            try {

                // pending → processing
                console.log("processing")
                await this.queue.updateJob(payload.id, {
                    status: "processing"
                })

                // Get the post
                const [post] = await this.orm.find(
                    payload.payload.category,
                    payload.payload.id
                )


                // Get current subscriptions
                const subscriptions =
                    await this.orm.get("push_notification")


                for (const row of subscriptions) {

                    const subscription = {
                        endpoint: row.endpoint,
                        keys: {
                            p256dh: row.p256dh,
                            auth: row.auth
                        }
                    }


                
                    
                    try {



                       

                        const  url = ` ${process.env.CLIENT_URL}/${payload.payload.category}/${payload.payload.id}`
                        const imgUrl = post.img ?  post.img =  `${process.env.BASE_URL}${post.img}` : "undefind"

                  

                                              
                        await this.pushService.sendNotification(
                            subscription,{
                                 ...post ,
                                 img:imgUrl,
                                 url:url,
                                 
                            }
                         
                        )

                        return




                    } catch (error) {

                        console.log(
                            "PUSH ERROR:",
                            error.statusCode
                        )


                        // Subscription expired/unsubscribed
                        if (
                            error.statusCode === 410 ||
                            error.statusCode === 404
                        ) {

                            console.log(
                                "DELETING SUBSCRIPTION:",
                                row.endpoint
                            )


                            const result =
                                await this.orm.destroyWhere(
                                    "push_notification",
                                    "endpoint",
                                    row.endpoint
                                )


                            console.log(
                                "DELETE RESULT:",
                                result
                            )


                            // Don't fail the whole job
                            continue
                        }


                        // Any other push error
                        throw error
                    }
                }


                // All subscriptions processed
                await this.queue.updateJob(payload.id, {
                    status: "completed",
                    attempts: payload.attempts + 1
                })


            //     console.log("job completed")


            } catch (error) {

                console.log(
                    "PUSH JOB ERROR:",
                    error
                )


                await this.queue.updateJob(payload.id, {
                    status: "failed",
                    attempts: payload.attempts + 1
                })
            }
        }
    }
}


export default PushNotificationWorkerService