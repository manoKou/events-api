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
    const updates = await prisma.update.findMany({
        where: {
            
        }
    })
}

export const createUpdates = async (req,res)=> {}

export const updateUpdates = async (req,res)=> {}

export const deleteUpdates = async (req,res)=> {}