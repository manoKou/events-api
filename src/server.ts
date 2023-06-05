import express from 'express'
import router from './router'
import morgan from 'morgan'
import cors from 'cors'
import { protect } from './modules/auth'
import { createNewUser, signin } from './handlers/user'
import swaggerUi from 'swagger-ui-express'
import swagger from  '@/../../swagger.json'

const app = express()

// this arrow func syntax means that this const is a function that returns a function
const customLogger = (message) => (req, res, next) => {
    console.log(`hello from ${message}`)
    next()
}

app.use(cors())
// this is global for the entire app. -> Logging
app.use(morgan('dev'))
// middleware to allow client to send json
app.use(express.json())
// allows client to add query strings and params,
// and encodes properly, instead of a string puts it in a object
app.use(express.urlencoded({extended: true}))

app.use(customLogger('custom logger'))

app.get('/', (req, res) => {
    console.log('Dev Log')
    res.status(200)
    res.json({message: 'hello'})
})

app.use('/api', protect, router)

app.post('/user', createNewUser)
app.post('/signin', signin)


app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swagger, {
    swaggerOptions: {
        requestInterceptor: function(request){
            request.headers.Origin = `http://localhost:3001`;
            return request;
        },
        url: `http://localhost:3001/api-docs`
    }
}))

export default app