import { useSelector } from "react-redux";
import Sidebar from "./Sidebar"

function Products() {
  const products = useSelector((state) => state.product.products);
  return (
    <div className="flex flex-row">
      <Sidebar />

      <main className="p-10 w-full">
        <h1 className="text-3xl font-bold mb-6">View all products</h1>

        <div>
          <table>
            <thead>
              <th>Image</th>
              <th>Title</th>
              <th>Description</th>
              <th>category</th>
              <th>location</th>
              <th>Satatus</th>
              <th>Publish Date</th>
              <th>Actions</th>
            </thead>
            <tbody>
              {products && products.map((item) => (
                <tr key={item._id}>
                  <td><img src={item.image} alt="" className="w-10 h-10 object-cover rounded-full" /></td>
                  <td>{item.title}</td>
                  <td>{item.description}</td>
                  <td>{item.category}</td>
                  <td>{item.location}</td>
                  <td>{item.status}</td>
                  <td>{item.createdAt.split("T")[0]}</td>
                  <td>
                    <button className="bg-blue-500 text-white p-2 rounded-full">Update</button>
                    <button className="bg-red-500 text-white p-2 rounded-full">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  )
}

export default Products