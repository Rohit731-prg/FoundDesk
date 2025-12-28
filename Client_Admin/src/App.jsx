import { Route, BrowserRouter as Router, Routes } from "react-router-dom"
import Login from './Component/Login'
import ProtuctedRoute from "./Component/ProtuctedRoute"
import Products from "./Component/Products"
import Dashboard from "./Component/Dashboard"
import NewProduct from "./Component/NewProduct"
import Question from "./Component/Question"

function App() {
  return (
    <Router>
      <Routes>

        <Route path='/' element={<Login />} />

        <Route path="/products" element={<ProtuctedRoute><Products /></ProtuctedRoute>} />
        <Route path="/dashboard" element={<ProtuctedRoute><Dashboard /></ProtuctedRoute>} />
        <Route path="/new-product" element={<ProtuctedRoute><NewProduct /></ProtuctedRoute>} />
        <Route path="/questions" element={<ProtuctedRoute><Question /></ProtuctedRoute>} />
      </Routes>
    </Router>
  )
}

export default App