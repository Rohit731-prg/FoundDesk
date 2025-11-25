import { useNavigate } from "react-router-dom";
import { navBer } from "../Utils/tables";

function Navbar() {
  const navigate = useNavigate();

  return (
    <nav className="fixed bottom-0 left-0 w-full bg-white shadow-lg py-3 px-5 flex items-center justify-around rounded-t-2xl z-50">
      {navBer.map((item) => (
        <button
          key={item.id}
          onClick={() => navigate(item.link)}
          className="flex flex-col items-center text-indigo-700 hover:text-indigo-900 transition"
        >
          <item.symbl className="text-2xl" />
        </button>
      ))}
    </nav>
  );
}

export default Navbar;
