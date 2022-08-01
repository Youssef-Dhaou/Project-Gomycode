import React from 'react'
import "./Search.css"

const Search = () => {
  return (
    <div>
<form className="searchform cf">
  <input type="text" placeholder="Is it me you’re looking for?" />
  <button type="submit">Search</button>
</form>

    </div>
  )
}

export default Search