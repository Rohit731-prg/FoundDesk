import { useState } from "react";
import Sidebar from "./Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { addNewAdmin, getAllAdmis } from "../store/AdminThunk";
import { FaFilePen } from "react-icons/fa6";
import { MdDelete } from "react-icons/md";
import { toast, Toaster } from "sonner";
import swal from "sweetalert2"

function StaffManagement() {
  const dispatch = useDispatch();
  const admins = useSelector((state) => state.admin.employees);
  const [search, setSearch] = useState("");
  const filterAdmin = (admins || []).filter((admin) => {
    return admin.name.toLowerCase().includes(search.toLowerCase())
  })
  const [adminDetails, setAdminDetails] = useState({
    name: "",
    email: "",
    phone: "",
    adminID: "",
    password: "",
    conPassword: "",
    role: "",
    image: null
  });

  const handelSubmit = async (e) => {
    e.preventDefault();
    if (adminDetails.password !== adminDetails.conPassword) return toast.error("Password must be same ..!");
    dispatch(addNewAdmin(adminDetails))
  };

  const handelUpdate = async () => {
    const result = await swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, update it!",
    });
    if (result.isConfirmed) {
      alert("yes")
    };
  };

  const handelDelete = async () => {
    const result = await swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, terminate Admin!",
    });
    if (result.isConfirmed) {
      alert("yes")
    };
  }

  useState(() => {
    dispatch(getAllAdmis());
  }, []);
  return (
    <div className="flex flex-row">
      <Sidebar />

      <main className="p-10 w-full">
        <h1 className="text-4xl font-medium mb-1">Staff Management</h1>
        <p className="text-gray-500">This is the Staff Management page.</p>

        <aside className="flex flex-row gap-8 py-5">
          <section className="w-1/2 rounded-lg ">
            <form className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow-lg" onSubmit={handelSubmit}>
              <h2 className="text-2xl font-semibold text-gray-800 mb-6">
                Add Staff Member
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Full Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    required
                    value={adminDetails.name}
                    onChange={(e) => setAdminDetails({ ...adminDetails , name: e.target.value })}
                    placeholder="John Doe"
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    required
                    value={adminDetails.email}
                    onChange={(e) => setAdminDetails({ ...adminDetails , email: e.target.value })}
                    placeholder="john@example.com"
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    Phone Number
                  </label>
                  <input
                    required
                    type="tel"
                    value={adminDetails.phone}
                    onChange={(e) => setAdminDetails({ ...adminDetails , phone: e.target.value })}
                    placeholder="+91 XXXXX XXXXX"
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Staff ID */}
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    Staff ID
                  </label>
                  <input
                    type="text"
                    required
                    value={adminDetails.adminID}
                    onChange={(e) => setAdminDetails({ ...adminDetails , adminID: e.target.value })}
                    placeholder="STF-1023"
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Password */}
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    Password
                  </label>
                  <input
                    type="password"
                    required
                    placeholder="Enter the password"
                    value={adminDetails.password}
                    onChange={(e) => setAdminDetails({ ...adminDetails , password: e.target.value })}
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Confirm Password */}
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    required
                    placeholder="Reenter the password"
                    value={adminDetails.conPassword}
                    onChange={(e) => setAdminDetails({ ...adminDetails , conPassword: e.target.value })}
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Role */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    Role
                  </label>
                  <select
                    required
                    value={adminDetails.role}
                    onChange={(e) => setAdminDetails({ ...adminDetails , role: e.target.value })} 
                    className="w-full md:w-1/2 rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option value="">Select Role</option>
                    <option value="admin">Admin</option>
                    <option value="staff">Staff</option>
                  </select>
                </div>

              </div>

              <label htmlFor="image">
                {adminDetails?.image ? (
                  <div className="rounded-lg border-dashed border-2 my-5 w-1/2 h-80">
                    <img src={URL.createObjectURL(adminDetails.image)} alt="" className="h-80 w-full object-cover" />
                  </div>
                ) : (
                  <div className="flex flex-col items-center px-10 py-5 rounded-lg border-dashed border-2 my-5">
                    <p>Upload Image Here</p>
                    <p>Drag and Drop an Image here</p>
                  </div>
                )}
              </label>
              <input type="file" id="image" accept="image/*" className="hidden" onChange={(e) => setAdminDetails({ ...adminDetails, image: e.target.files[0]})} />

              {/* Button */}
              <div className="mt-8">
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition"
                >
                  Add Staff Member
                </button>
              </div>
            </form>
          </section>


          <section className="w-1/2 rounded-lg shadow-2xl px-1 py-10">
            <h1 className="text-2xl font-semibold text-gray-800 ml-10 mb-6">Recents Added Admins</h1>
            <input 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search Staffs by Name"
              className="bg-pink-50 outline-none w-1/2 ml-10 px-5 py-2 border-2 rounded-full"
              type="text" />

            <table className="overflow-x-auto rounded-lg border border-gray-200 w-full my-5 text-sm text-left text-gray-600">
              <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
                <tr>
                  <th className="table-content">Image</th>
                  <th className="table-content">Name</th>
                  <th className="table-content">Email</th>
                  <th className="table-content">Admin ID</th>
                  <th className="table-content">Action</th>
                </tr>
              </thead>
              {admins ? (
                <tbody className="divide-y divide-gray-200 bg-white">
                  {filterAdmin.map((admin) => (
                    <tr key={admin?._id} className="hover:bg-gray-50">
                      <td className="px-3 py-4"><img src={admin.image} alt="" className="w-14 h-14 rounded-full object-cover" /></td>
                      <td className="px-3 py-4">{admin.name}</td>
                      <td className="px-3 py-4">{admin.email}</td>
                      <td className="px-3 py-4">{admin.adminID}</td>
                      <td className="px-3 py-4">
                        <div>
                          <button onClick={() => handelUpdate(admin)} className="btn bg-blue-500 mx-1">
                            <FaFilePen />
                          </button>
                          <button className="btn bg-red-500">
                            <MdDelete />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              ) : (
                <tbody>
                  <tr>
                    <td>No Data Founded</td>
                  </tr>
                </tbody>
              )}
            </table>
          </section>
        </aside>
      </main>
      <Toaster />
    </div>
  );
}

export default StaffManagement;
