import React from 'react'
import './Searchbar.css'

function Searchbar({query, onChange, onSubmit, onReset, isAskMode, loading}) {
  return (
    <form className='search-form' onSubmit={onSubmit}>
        <div className='search-box'>
            <span className='search-icon'>✦</span>

            <input
              className='search-input'
              type='text'
              placeholder='Ask AI — try "budget laptop for students" or "gaming setup"'
              value={query}
              onChange={(e)=>onChange(e.target.value)}
            />

            <button className='search-btn' type='submit' disabled={loading}>
                {loading ? 'thinking...' : "Ask AI"}
            </button>
        </div>

        {isAskMode && (
            <button className='reset-btn' type='button' onClick={onReset}>
                Show all Products
            </button>
        )}
    </form>
  )
}

export default Searchbar