import { Sidebar as SS, Menu, MenuItem } from "react-pro-sidebar";
import { Link } from "react-router-dom";
import { sideBarStaff } from "../Utils/Elements";
import { useSelector } from "react-redux";

function Sidebar() {
  const admin = useSelector((state) => state.admin.admin);
  return (
    <SS className="min-h-screen">
      <Menu>
        <div className="flex flex-row p-5 gap-2">
          <img src={admin?.image} alt="" className="h-14 w-14 rounded-full object-center" />
          <div>
            <p className="text-lg font-medium">{admin?.name}</p>
            <p className="text-sm font-medium text-gray-500">{admin?.email}</p>
          </div>
        </div>
        {sideBarStaff.map((item) => (
          <MenuItem className="" key={item.id} component={<Link to={item.link} />}>
            {item.name}
          </MenuItem>
        ))}
      </Menu>
    </SS>
  );
}

export default Sidebar;
