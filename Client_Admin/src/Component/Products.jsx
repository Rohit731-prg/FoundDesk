import { useDispatch, useSelector } from "react-redux";
import Sidebar from "./Sidebar"
import { useEffect, useState } from "react";
import { Toaster } from "sonner";
import { getAllProducts, deleteProduct, updateProductStatus } from "../store/ProductThunk";
import { FaFilePen } from "react-icons/fa6";
import { MdDelete } from "react-icons/md";
import Swal from 'sweetalert2'

function Products() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.product.products);

  const fetchData = async () => {
    dispatch(getAllProducts());
  };

  const deleteData = async (id) => {
    console.log("delete id", id);
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    });
    if (result.isConfirmed) {
      console.log("delete id", id);
      dispatch(deleteProduct(id));
    }
  };

  const updateProduct = async (product) => {
    const { value: formValues } = await Swal.fire({
      title: "Update Product",
      html: `
      <input id="swal-title" class="swal2-input" placeholder="Title" value="${product.title}" />
      
      <textarea id="swal-description" class="swal2-textarea" placeholder="Description">
${product.description}
      </textarea>

      <input id="swal-location" class="swal2-input" placeholder="Location" value="${product.location}" />

      <select id="swal-status" class="swal2-select">
        <option value="open" ${product.status === "open" ? "selected" : ""}>Open</option>
        <option value="closed" ${product.status === "closed" ? "selected" : ""}>Closed</option>
      </select>
    `,
      showCancelButton: true,
      confirmButtonText: "Update",
      focusConfirm: false,

      preConfirm: () => {
        return {
          id: product._id,
          title: document.getElementById("swal-title").value,
          description: document.getElementById("swal-description").value,
          location: document.getElementById("swal-location").value,
          status: document.getElementById("swal-status").value,
        };
      },
    });

    if (formValues) {
      dispatch(updateProductStatus(formValues));
    }
  };


  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="flex flex-row">
      <Sidebar />

      <main className="p-10 w-full">
        <h1 className="text-3xl font-bold mb-6">View all products</h1>
        <div className="overflow-x">
          <table className="w-full">
            <thead>
              <tr>
                <th className="table-content">
                  Image
                </th>
                <th className="table-content">
                  Title
                </th>
                <th className="table-content">
                  Description
                </th>
                <th className="table-content">
                  Category
                </th>
                <th className="table-content">
                  Location
                </th>
                <th className="table-content">
                  Status
                </th>
                <th className="table-content">
                  Publish Date
                </th>
                <th className="table-content">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {products && products.map((item) => (
                <tr key={item._id} className="border-b border-gray-200">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <img src={item.image} alt="" className="w-10 h-10 object-cover rounded-full" />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {item.title}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {item.description}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {item.category}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {item.location}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {item.status}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {item.createdAt.split("T")[0]}
                  </td>
                  <td className="px-6 py-4">
                    <button className="btn mr-2 bg-blue-400" onClick={() => updateProduct(item)}><FaFilePen /></button>
                    <button className="btn bg-red-500" onClick={() => deleteData(item._id)}><MdDelete /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
      <Toaster />
    </div>
  )
}

export default Products