import { Route, BrowserRouter as Router, Routes } from "react-router-dom"
import Login from "./Components/Login"
import Signup from "./Components/Signup"
import ProtectedRoute from "./Utils/ProtectedRoute"
import Home from "./Components/Home"
import Seting from "./Components/Seting"
import Profile from "./Components/Setting_pages/Profile"
import Posts from "./Components/Posts"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="/signup" element={<Signup/>} />

        {/* Protected Routes */}
        <Route path="/home" element={ <ProtectedRoute><Home/></ProtectedRoute>} />
        <Route path="/setting" element={ <ProtectedRoute><Seting/></ProtectedRoute>} />
        <Route path="/profile" element={ <ProtectedRoute><Profile/></ProtectedRoute>} />
        <Route path="/products" element={ <ProtectedRoute><Posts/></ProtectedRoute>} />
      </Routes>
    </Router>
  )
}

export default App