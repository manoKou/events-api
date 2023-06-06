import { rejects } from "assert"
import { ResultWithContext } from "express-validator/src/chain"
import prisma from "../db"


export const getOneUpdate = async (req,res) => {
    const update = await prisma.update.findUnique({
        where: {
            id: req.params.id
        }
    })

    res.json({data: update})
}


export const getUpdates = async (req,res)=> {
    const events = await prisma.event.findMany({
        where: {
            belongsToId: req.user.id
        },
        include: {
            updates: true
        }
    })
    
    /**
     * @note it would be better to just add another index to the schema
     */ 
    const updates = events.reduce((allUpdates, event) => {
        return [...allUpdates, ...event.updates]
    }, [])

    res.json({data: updates})
}


export const createUpdate = async (req,res)=> {
    const event = await prisma.event.findUnique({
        where: {
            id: req.body.eventId
        }
    })
    if(!event) {
        return res.json({message: "Event does not belong to user"})
    }
    const update = await prisma.update.create({
        data: {
            title: req.body.title,
            body: req.body.body,
            event: {connect: {id: event.id}}
        }
    })
    res.json({data: update})
}


export const updateUpdate = async (req,res)=> {
    const events = await prisma.event.findMany({
        where: {
            belongsToId: req.user.id
        },
        include: {
            updates: true
        }
    })
    
    /**
     * @note the code below can probably be handled by prisma's query above
     */
    const updates = events.reduce((updatesAccumulator, event) => {
        return [...updatesAccumulator, ...event.updates]
    }, [])
    const match = updates.find(update => update.id === req.params.id)
    
    if(!match){
        return res.json({message: 'Update does not belong to user.'})
    }
    const updatedUpdate = await prisma.update.update({
        where: {
            id: req.params.id
        },
        data: req.body
    })
    res.json({data: updatedUpdate})
}


export const deleteUpdate = async (req,res)=> {
    const events = await prisma.event.findMany({
        where: {
            belongsToId: req.user.id
        },
        include: {
            updates: true
        }
    })
    
    const updates = events.reduce((updatesAccumulator, event) => {
        return [...updatesAccumulator, ...event.updates]
    }, [])
    const match = updates.find(update => update.id === req.params.id)
    
    if(!match){
        return res.json({message: 'Update does not belong to user.'})
    }
    const deletedUpdate = await prisma.update.delete({
        where: {
            id: req.params.id
        }
    })
    res.json({data: deletedUpdate})
}