import { useNavigate } from 'react-router-dom';
import { FaLongArrowAltLeft } from 'react-icons/fa';
import useUserStore from '../../Store/UserStore';

function Questions() {
    const navigate = useNavigate();
    const { user } = useUserStore();
    return (
        <div className="p-5">
            <button onClick={() => navigate('/setting')}>
                <FaLongArrowAltLeft />
            </button>

            <div className='mt-3 flex flex-row gap-2 '>
                <img src={user?.image} alt="" className='w-20 h-20 rounded-full object-cover' />
                <p className='mt-2'>{user?.name}</p>
            </div>

            <button className='mt-3 py-3 w-full bg-blue-500 text-white font-semibold rounded-full'>
                Ask a New Question
            </button>

            <div>
                <p>Your Previous Questions</p>
                
            </div>
        </div>
    )
}

export default Questions