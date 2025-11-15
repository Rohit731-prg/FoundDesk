import { useNavigate } from 'react-router-dom'
import { navBer } from '../Utils/tables'

function Navbar() {
    const navigate = useNavigate();
  return (
    <div>
        <nav className='flex flex-row items-center justify-around'>
            {navBer.map((item) => (
                <li key={item.id} className='list-none'>
                    <button onClick={() => navigate(item.link)}>
                        <item.symbl />
                    </button>
                </li>
            ))}
        </nav>
    </div>
  )
}

export default Navbar