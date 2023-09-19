import { Router } from "express";
import crypto from 'node:crypto'
import { info }from '../server.js'
import { validateUser } from "../Schemas/users.js";


export const usersRouter = Router()

usersRouter.get('/' , (req, res) => {
    res.status(201).json(info)
})

usersRouter.get('/:id' , (req, res) => {
   
    const { id } =  req.params
    const user = [...info].filter( e => e.id === id)
    res.status(200).json(user)
})

usersRouter.post('/' , (req , res) => {
    const result = validateUser(req.body)
    if (result.error){
        return res.status(400).json({ message : result.error.message })
    }

    const newUser = {...result.data, id : crypto.randomUUID()} 
    info.push(newUser)
    res.status(201).json(newUser)
}  )

usersRouter.put('/:id' , (req ,res) => {
    
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

usersRouter.delete('/:id' , (req , res) => {
    const { id } = req.params
    if ( info.find( e => e.id === id ) ) {
        const usersIndex = info.findIndex( e =>  e.id === id)
        const deletedUser = info[usersIndex]
        info.splice(usersIndex, 1)
        res.status(200).json(deletedUser)
    }
    else res.status(200).json({message : "no user with this id"})
} )



