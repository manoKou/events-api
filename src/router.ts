import {Router} from 'express'
import {body, oneOf, validationResult} from "express-validator"
import { createEvent, deleteEvent, getEvents, getOneEvent } from './handlers/event'
import { createUpdate, deleteUpdate, getOneUpdate, getUpdates, updateUpdate } from './handlers/update'
import { handleInputErrors } from './modules/middleware'

const router = Router()

/**
 * Event
 */

router.get('/event', getEvents)
router.get('/event/:id', getOneEvent)
router.put('/event/:id', [body('name').isString()], handleInputErrors, (req,res) => {})
router.post('/event', body('name').isString(), handleInputErrors, createEvent)
router.delete('/event/:id', deleteEvent)

/**
 * Update
 */

router.get('/update', getUpdates)
router.get('/update/:id', getOneUpdate)
router.put('/update/:id',
    body('title').optional(), 
    body('body').optional(),
    body('status').isIn(['IN_PROGRESS','CANCELED','DEPRECATED']).optional(),
    body('version').optional(),
    updateUpdate
)
router.post('/update', 
    body('title').exists().isString(), 
    body('body').exists().isString(),
    body('eventId').exists().isString(),
    createUpdate
)
router.delete('/update/:id', deleteUpdate)

/**
 * Update Point
 */

router.get('/updatepoint', () => {})
router.get('/updatepoint/:id', () => {})
router.put('/updatepoint/:id', 
    body('name').optional().isString(), 
    body('description').optional().isString(),
    () => {}
)
router.post('/updatepoint', 
    body('name').exists().isString(), 
    body('description').exists().isString(),
    body('updateId').exists().isString(),
    () => {}
)
router.delete('/updatepoint', () => {})

export default router