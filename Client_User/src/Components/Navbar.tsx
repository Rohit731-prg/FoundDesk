import React from 'react'
import { navBer } from '../Utils/tables'

function Navbar() {
  return (
    <div>
        <nav>
            {navBer.map((item) => (
                <li key={item.id}>
                    <a href={item.link}>
                        <item.symbl />
                        {item.name}
                    </a>
                </li>
            ))}
        </nav>
    </div>
  )
}

export default Navbar