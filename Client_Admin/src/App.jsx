import { Route, BrowserRouter as Router, Routes } from "react-router-dom"
import Login from './Component/Login'
import ProtuctedRoute from "./Component/ProtuctedRoute"
import Products from "./Component/Products"
import Dashboard from "./Component/Dashboard"
import NewProduct from "./Component/NewProduct"
import Question from "./Component/Question"
import Claims from "./Component/Claims"
import StudentManagement from "./Component/Student-Managment"
import StaffManagement from "./Component/StaffManagement"
import Error from "./Component/Error"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="*" element={<Error />} />
        <Route path='/' element={<Login />} />

        <Route path="/products" element={<ProtuctedRoute><Products /></ProtuctedRoute>} />
        <Route path="/dashboard" element={<ProtuctedRoute><Dashboard /></ProtuctedRoute>} />
        <Route path="/new-product" element={<ProtuctedRoute><NewProduct /></ProtuctedRoute>} />
        <Route path="/questions" element={<ProtuctedRoute><Question /></ProtuctedRoute>} />
        <Route path="/claims" element={<ProtuctedRoute><Claims /></ProtuctedRoute>} />
        <Route path="/student-management" element={<ProtuctedRoute><StudentManagement/></ProtuctedRoute>} />
        <Route path="/staff-management" element={<ProtuctedRoute><StaffManagement/></ProtuctedRoute>} />
      </Routes>
    </Router>
  )
}

export default App