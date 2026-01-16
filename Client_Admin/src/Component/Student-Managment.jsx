import { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { getAllStudentsThunk } from "../store/StudentThunk";
import { CiSearch } from "react-icons/ci";
import { FaFilePen } from "react-icons/fa6";
import { MdDelete } from "react-icons/md";

function StudentManagement() {
  const dispatch = useDispatch();
  const students = useSelector((state) => state.student.students);
  const [search, setSearch] = useState("")
  const filterStudent = students ? students.filter((student) => {
    return student.name.toLowerCase().includes(search.toLowerCase())
  }) : null
  const studentTable = [
    { id: 1, name: "Image" },
    { id: 2, name: "Name" },
    { id: 3, name: "Email" },
    { id: 4, name: "Collage ID" },
    { id: 5, name: "Authenticate" },
    { id: 6, name: "Create At" },
    { id: 7, name: "Actions" },
  ];

  useEffect(() => {
    dispatch(getAllStudentsThunk());
  }, []);
  return (
    <div className="flex flex-row">
      <Sidebar />

      <main className="p-10 w-full">
        <h1 className="text-4xl font-medium mb-1">Student Management</h1>
        <p className="text-gray-500">This is the Student Management page.</p>

        <section className="py-10">
          <div className="flex flex-row gap-10">
            <div className="flex gap-3 px-5 py-2 bg-pink-50 rounded-full border-2 items-center mb-4 w-1/4">
              <CiSearch />
              <input
                placeholder="Search Students by name"
                className="bg-pink-50 outline-none w-full"
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <div className="px-5 py-2 bg-pink-50 rounded-full border-2 mb-4 w-1/4">
              <select
                className="bg-pink-50 outline-none w-full"
              >
                <option value="">Sort by Authenticate</option>
              </select>
            </div>
          </div>
          <div className="overflow-x-auto rounded-lg border border-gray-200">
            <table className="w-full text-sm text-left text-gray-600">
              <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
                <tr>
                  {studentTable.map((item) => (
                    <th key={item.id} className="table-content">
                      {item.name}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-200 bg-white">
                {students && students.length > 0 ? (
                  filterStudent.map((student) => (
                    <tr key={student._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <img
                          src={student.image}
                          alt="Profile"
                          className="w-10 h-10 rounded-full object-cover"
                        />
                      </td>
                      <td className="px-4 py-2">{student.name}</td>
                      <td className="px-4 py-2">{student.email}</td>
                      <td className="px-4 py-2">{student.collage_id}</td>
                      <td className="px-4 py-2">
                        {student.auth ? "Yes" : "No"}
                      </td>
                      <td className="px-4 py-2">
                        {student.createdAt.split("T")[0]}
                      </td>
                      <td className="px-6 py-4 flex justify-center gap-2">
                        <button className="btn bg-blue-500">
                          <FaFilePen />
                        </button>
                        <button className="btn bg-red-500">
                          <MdDelete />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={studentTable.length}
                      className="px-4 py-2 border text-center"
                    >
                      No students found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
}

export default StudentManagement;
