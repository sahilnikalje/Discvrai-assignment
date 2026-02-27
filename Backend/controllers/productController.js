const products=require('../data/products')

const getProducts=(req,res)=>{
    const{category}=req.query

    if(category){
        const filtered=products.map((p)=>p.category.toLocaleLowerCase()===category.toLocaleLowerCase())
        return res.status(200).json(filtered)
    }
    return res.status(200).json(filtered)
}

module.exports=getProducts