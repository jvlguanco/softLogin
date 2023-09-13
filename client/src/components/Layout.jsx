import React from 'react'
import { Outlet } from 'react-router-dom'

const Layout = () => {
    return (
        <main>
            <p>Nav Bar</p>
            <Outlet/>
            <p>Bottom</p>
        </main>
    )
}

export default Layout