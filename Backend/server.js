const express=require('express')
const cors=require('cors')
const dotenv=require('dotenv').config()

const productRoutes=require('./routes/productRoutes')
const askRoutes=require('./routes/askRoutes')

const app=express()

const allowedOrigin=process.env.VITE_URI

app.use(cors({
    origin:allowedOrigin,
    methods:['GET', 'POST'],
    credentials:true
}))

app.use(express.json())

app.use('/api/products', productRoutes)
app.use('/api/ask', askRoutes)

const PORT=process.env.PORT

app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`)
})
