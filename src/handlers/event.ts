import prisma from "../db"

/**
 * @desc Get all Events for User
 * @param req 
 * @param res 
 */
export const getEvents = async (req, res) => {
    const  user = await prisma.user.findUnique({
        where: {
            id: req.user.id
        },
        include: {
            events: true
        }
    })

    res.json({data: user})
}

// Get One
export const getOneEvent = async (req, res) => {
    const id = req.params.id

    const event = await prisma.event.findFirst({
        where: {
            id,
            belongsToId: req.user.id,
        }
    })

    res.json({data: event})
}

// Create One
export const createEvent = async (req, res, next) => {
    try {
        const event = await prisma.event.create({
            data: {
                name: req.body.name,
                belongsToId: req.user.id
            }
        })
        res.json({data: event})
    } catch (err) {
        next(err)
    }
}


// Update One
export const updateEvent = async (req,res) => { 
    const updated = await prisma.event.update({
        where: {
            id_belongsToId: {
                id: req.params.id,
                belongsToId: req.user.id
            }
        },
        data: {
            name: req.body.name
        }
    })

    res.json({data: updated})
}

export const deleteEvent = async (req,res) => { 
    const deleted = await prisma.event.delete({
        where: {
            id_belongsToId: {
                id: req.params.id,
                belongsToId: req.user.id
            }
        }
    })

    res.json({data: deleted})
}