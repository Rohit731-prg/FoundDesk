import { Sidebar as SS, Menu, MenuItem } from "react-pro-sidebar";
import { Link } from "react-router-dom";
import { sideBarAdmin, sideBarStaff } from "../Utils/Elements";
import { useSelector } from "react-redux";

function Sidebar() {
  const admin = useSelector((state) => state.admin.admin);
  return (
    <SS className="min-h-screen relative">
      <Menu>
        <div className="flex flex-row p-5 gap-2 border-b border-gray-300 mb-4 items-center">
          <img src={admin?.image} alt="" className="h-14 w-14 rounded-full object-cover" />
          <div>
            <p className="text-lg font-medium">{admin?.name}</p>
            <p className="text-sm font-medium text-gray-500">{admin?.email}</p>
          </div>
        </div>
        <div>
          {admin?.role === "admin" ? (
            <div>
              {sideBarAdmin.map((item) => (
                <MenuItem className="" key={item.id} component={<Link to={item.link} />}>
                  {item.name}
                </MenuItem>
              ))}
            </div>
          ) : (
            <div>
              {sideBarStaff.map((item) => (
                <MenuItem className="" key={item.id} component={<Link to={item.link} />}>
                  {item.name}
                </MenuItem>
              ))}
            </div>
          )}
        </div>
        <div className="absolute bottom-0 w-full p-5 border-t border-gray-300">
          <button className="w-full py-3 bg-red-500 text-white rounded-md font-medium active:scale-95 transition">
            LOGOUT
          </button>
        </div>
      </Menu>
    </SS>
  );
}

export default Sidebar;
