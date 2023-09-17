import express from "express"
import cors from 'cors'
import * as dotenv from "dotenv"
import crypto from 'node:crypto'

dotenv.config()
const app = express()
const PORT = process.env.PORT ?? 8080
let info = [
    {  
        username : "lola" , 
        age : 22 ,
        id: "9122e387-39eb-4159-bbdc-4bc2f21899e2"
    },
    {  
        username : "peter" , 
        age : 92,
        id: "1122e387-12fb-4168-aadc-4bc2f66669e2"
    },
    {  
        username : "ana" , 
        age : 16,
        id: "80412e387-39cb-1209-aadc-4bc2f99999e2"
    },
]

// middleware
app.use(cors())
app.use(express.json())
app.get('/' , ( req , res ) => {
    res.send('Hello There')

} )

app.get('/users' , (req, res) => {
    res.status(201).json(info)
}  )

app.get('/users/:id' , (req, res) => {
    const { id } =  req.params
    const user = [...info].filter( e => e.id === id)
    res.status(200).json(user)
}  )


app.post('/users' , (req , res ) => {
    const newUser = {...req.body, id : crypto.randomUUID()} 
    info.push(newUser)
    res.status(201).json(newUser)

})

app.put('/users/:id' , (req, res) => {
    const { id } = req.params
    if (info.find( e => e.id === id)  ){
      
        const updateUser = req.body
         info = info.map( e => {
            if ( e.id === id){
                return {...updateUser , id : e.id}
            }
            else return e
        } )
    
        res.status(200).json(info.filter( e => e.id === id))
    }
    else res.status(200).json({message : "no user with this id"})

})

app.delete('/users/:id' , (req , res) => {
    const { id } = req.params
    if ( info.find( e => e.id === id ) ) {

        const usersIndex = info.findIndex( e =>  e.id === id)
        info.splice(usersIndex, 1)
    
        res.status(200).json(info.find(e => e.id === id))
    }
    else res.status(200).json({message : "no user with this id"})
})

app.use( (req, res ) => {
    
    res.status(404).send("<h1>LEAVE ME ALONE , THERE IS NO PAGE HERE</h1>")
})

app.listen(PORT, () => {
    console.log(`The server is up on http://localhost:${PORT}`)
    
})

