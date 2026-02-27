const express=require('express')
const cors=require('cors')
const dotenv=require('dotenv').config()

const app=express()

app.use(express.json())

const PORT=process.env.PORT

app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`)
})
