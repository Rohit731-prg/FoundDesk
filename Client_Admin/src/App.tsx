import { Route, BrowserRouter as Router, Routes } from "react-router-dom"
import Login from "./Component/Login"


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login/>} />
        {/* <Route path="/signup" element={<Signup/>} /> */}

        {/* Protected Routes */}
        {/* <Route path="/home" element={ <ProtectedRoute><Home/></ProtectedRoute>} />
        <Route path="/setting" element={ <ProtectedRoute><Seting/></ProtectedRoute>} />
        <Route path="/profile" element={ <ProtectedRoute><Profile/></ProtectedRoute>} />
        <Route path="/products" element={ <ProtectedRoute><Posts/></ProtectedRoute>} />
        <Route path="/product" element={ <ProtectedRoute><Post/></ProtectedRoute>} /> */}
      </Routes>
    </Router>
  )
}

export default App