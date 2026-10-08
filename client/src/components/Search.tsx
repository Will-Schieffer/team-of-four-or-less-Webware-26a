// Placeholder Search Bar
import React, { useState } from 'react'
import { useNavigation } from 'react-router-dom'
import './components.css' 

function Database_Search() {
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigation();

    
}

export function Search() {
    return (
        <div className="search">
            <input onClick={() => Database_Search()} className='search-bar' type="text" placeholder="Search..." />
            <button>Search</button>
        </div>
    )
}