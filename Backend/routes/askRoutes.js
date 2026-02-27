const express=require('express')
const router=express.Router()
const askAI=require('../controllers/askController')

router.post('/', askAI)

module.exports=router