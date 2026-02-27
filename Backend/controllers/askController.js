const products=require('../data/products')

const askAI=async(req,res)=>{
    const{query}=req.body

    if(!query){
        return res.status(400).json({message:"Send a query"})
    }

    const productText=products.map((p)=>{
        return `ID: ${p.id}, Name: ${p.name}, Category: ${p.category}, Price: ${p.price}, Description: ${p.description}, Tags: ${p.tags.join(", ")} `
    }).join("\n")

    const prompt=`
      You are a product assistant. 
      Based on the users query, find the most relevent products from the list below:

      User query: "${query}"

      Available products: ${productText}

      Reply in this JSON format only:
      {
       "productIds": [matching product IDs as numbers],
       "summary":"one line short explanation of why these products match the query"
      }
    `

    try{
        const resp=await fetch("https://api.groq.com/openai/v1/chat/completions", {
            method:"POST",
            headers:{
                "Content-Type":"application/json",
                Authorization:`Bearer ${process.env.GROQ_API_KEY}`
            },
            body:JSON.stringify({
                model:"llama-3.1-8b-instant",
                messages:[{role:"user", content:prompt}]
            })
        })

        const data=await resp.json()
        const llmReply=data.choices[0].message.content

        const parsed=JSON.parse(llmReply)

        const matchedProducts=products.filter((p)=>parsed.productIds.includes(p.id))

        res.json({
            products:matchedProducts,
            summary:parsed.summary
        })
    }
    catch(err){
        console.error(err.message)
        res.status(502).json({message:"Something went wrong. Please try again later"})
    }
}

module.exports=askAI