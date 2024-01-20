import { Router } from "express";
import {  ObjectId  ,MongoClient , ServerApiVersion} from "mongodb";

// CONNECT TO MONGO DB 
const client = new MongoClient(process.env.MONGO_URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
})

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
      await client.connect()
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 })
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close()
  }
}
run().catch(console.dir)

// ADD LINK TO THE DB
async function addLink(link) {
  
  await client.connect()
  // Get the current date
  const currentDate = new Date()
  // Calculate the date one month from now
  const oneMonthFromNow = new Date(currentDate)
  oneMonthFromNow.setMonth(currentDate.getMonth() + 1)

  const result = await client.db("cody-links-shortener").collection("links").insertOne({ link: link, createdAt: new Date(), expiresAt: oneMonthFromNow })
  return result
}
//  GET THE LINKS FROM THE DB
async function getLink(id) {
    await client.connect()
    const data =  await client.db("cody-links-shortener").collection("links").findOne({ _id :  new ObjectId(id)}  ) ;
    return data
}

export const codyRouter = Router()

codyRouter.post("/" , (req, res) => {
    const { content } = req.body
    
    //  IF BODY IS EMPTY
    if ( content === undefined ) return res.status(400).json({message : "no content"})
    // ADD LINK TO THE DB
    addLink(content).then( result => {
        const id = result.insertedId.toString()
        res.status(200).json({message : "link added" , status : "ok" , link : `${process.env.CODY_SERVER_ENDPOINT}${id}`})

    }).catch( err => {
        res.status(400).json({message : "Could not add link to database" , error : err , status : "error"})
    })
})

codyRouter.get("/:id" , (req, res) => {
    const { id } = req.params
    // GET LINKS FROM DB
    getLink(id).then( result => {
        res.redirect(result.link)
    })
    .catch( err => {
        res.status(400).json({message : "Could not find the link in the database" , error : err , status : "error"})
    })
})
