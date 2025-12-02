import useItemStore from "../Store/ItemStore"
import { FaLongArrowAltLeft } from "react-icons/fa";

function Post() {
    const { item } = useItemStore();
    return (
        <div className="p-5">
            <button 
            onClick={() => window.history.back}
            className="p-3 rounded-full shadow-2xl bg-gray-200">
                <FaLongArrowAltLeft />
            </button>
            {!item ? <p>Loading...</p> : 
            <main className="py-5">
                <img src={item.image} alt="" />
                <p>Item Name : {item?.title}</p>
            </main>}             

            
        </div>
    )
}

export default Post