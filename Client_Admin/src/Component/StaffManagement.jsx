import { useState } from "react";
import Sidebar from "./Sidebar";

function StaffManagement() {
  const [adminDetails, setAdminDetails] = useState({
    name: "",
    email: "",
    phone: "",
    adminID: "",
    password: "",
    conPassword: "",
    role: "",
    image: null
  })
  return (
    <div className="flex flex-row">
      <Sidebar />

      <main className="p-10 w-full">
        <h1 className="text-4xl font-medium mb-1">Staff Management</h1>
        <p className="text-gray-500">This is the Staff Management page.</p>

        <aside className="flex flex-row gap-10 py-5">
          <section className="w-1/2 rounded-lg ">
            <form className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow-lg">
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
                    type="tel"
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
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Role */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    Role
                  </label>
                  <select className="w-full md:w-1/2 rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
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


          <section className="w-1/2 rounded-lg shadow-2xl p-10">
            <h1 className="text-2xl font-semibold text-gray-800 mb-6">Recents Added Admins</h1>
            <input 
              className="bg-pink-50 outline-none w-full px-5 py-2 border-2 rounded-full"
              type="text" />

            <table>
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Admin ID</th>
                  <th>Action</th>
                </tr>
              </thead>
            </table>
          </section>
        </aside>
      </main>
    </div>
  );
}

export default StaffManagement;
