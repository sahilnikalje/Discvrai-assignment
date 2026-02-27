import React, { useState , useEffect} from 'react'
import Searchbar from './components/Searchbar'
import ProductCard from './components/ProductCard'
import './App.css'


function App() {
    const[products, setProducts]=useState([])
    const[query, setQuery]=useState('')
    const[summary, setSummary]=useState('')
    const[loading, setLoading]=useState(false)
    const[error, setError]=useState('')
    const[isAskMode, setIsAskMode]=useState(false)
    const[highlightedIds, setHighlightedIds]=useState([])

    useEffect(()=>{
        loadAllProducts()
    },[])

    function loadAllProducts(){
        fetch(`${import.meta.env.VITE_API_URI}/api/products`)
            .then((res)=>res.json())
            .then((data)=>setProducts(data))
            .catch(()=>setError("Could not load products.."))
    }

    function handleAsk(e){
        e.preventDefault()
        if(!query.trim()){
            return
        }

        setLoading(true)
        setError("")
        setSummary("")
        setIsAskMode(true)
        setHighlightedIds([])

        fetch(`${import.meta.env.VITE_API_URI}/api/ask`, {
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({query})
        })
        .then((res)=>res.json())
        .then((data)=>{
            if(data.error){
                setError(data.error)
                setProducts([])
            }
            else{
                setProducts(data.products)
                setSummary(data.summary)
                setHighlightedIds(data.products.map((p)=>p.id))
            }
            setLoading(false)
        })
        .catch(()=>{
            setError("Something went wrong. Please try again.")
            setLoading(false)
        })
    }


    function handleReset(){
        setQuery("")
        setSummary("")
        setError("")
        setIsAskMode(false)
        setHighlightedIds([])
        loadAllProducts()
    }

  return (
    <div className='app'>
        <header className='header'>
            <h1 className='header-title'>Discover Products</h1>
            <p className='header-subtitle'>
                Browse our products or search to find what you need
            </p>
        </header>

        <section className='search-section'>
            <Searchbar
              query={query}
              onChange={setQuery}
              onSubmit={handleAsk}
              onReset={handleReset}
              isAskMode={isAskMode}
              loading={loading}
            />
        </section>
{/* ---------------------------------------------------------------------------------- */}
                {/* AI summary */}
        {summary && (
            <div className="summary-box">
                <span className="summary-icon">✦</span>
                <div>
                    <p className='summary-label'>AI Summary</p>
                    <p className='summary-text'>{summary}</p>
                </div>
            </div>
        )}

 {/* ---------------------------------------------------------------------------------- */}
           {/* error        */}
        {error && <p className='error-text'>{error}</p>}

        <div className='section-heading'>
            <h2>{isAskMode ? `Results for "${query}"` : "All Products"}</h2>
            <span className='product-count'>{products.length} Products</span>
        </div>


{/* ---------------------------------------------------------------------------------- */}
              {/* loading */}

              {loading && (
                <div className="loading-container">
                    <div className="loading-spinner"></div>
                    <p>AI is thinking</p>
                </div>
              )}

{/* ---------------------------------------------------------------------------------- */}
        {/* products */}

        {!loading && (
            <div className="products-grid">
                {products.length===0 ? (
                    <div className="empty-state">
                        <p>No product found for your query</p>
                        <button className='show-all-btn' onClick={handleReset}>
                            Show all products
                        </button>
                    </div>
                ):(
                    products.map((product)=>(
                        <ProductCard
                          key={product.id}
                          product={product}
                          isHighlighted={highlightedIds.includes(product.id)}
                        />
                    ))
                )}
            </div>
        )}
    </div>
  )
}

export default App