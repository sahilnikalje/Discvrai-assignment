const products=require('../data/products')

const getProducts=(req,res)=>{
    const{category}=req.query

    if(category){
        const filtered=products.filter((p)=>p.category.toLocaleLowerCase()===category.toLocaleLowerCase())
        return res.status(200).json(filtered)
    }
    return res.status(200).json(products)
}

module.exports=getProducts