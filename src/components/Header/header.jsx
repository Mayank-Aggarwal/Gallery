import React from 'react';
import Search from "../Search/Search";
import './styles.css'

const header = () => {
  return (
    <div className="fixed-top">
        <nav className="desktop navbar-dark bg-dark">
            <h1 className="navbar-brand m-2" onClick={() => window.location.reload()}>Gallery</h1>
            <Search />
        </nav>
    </div>
  )
}

export default header