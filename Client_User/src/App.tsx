import { Route, BrowserRouter as Router, Routes } from "react-router-dom"
import Login from "./Components/Login"
import Signup from "./Components/Signup"
import ProtectedRoute from "./Utils/ProtectedRoute"
import Home from "./Components/Home"
import Seting from "./Components/Setting"
import Profile from "./Components/Setting_pages/Profile"
import Posts from "./Components/Posts"
import Post from "./Components/Post"
import PasswordChange from "./Components/Setting_pages/PasswordChange"
import Error from "./Components/Error"
import Claim from "./Components/Claim"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="*" element={<Error />} />
        <Route path="/" element={<Login/>} />
        <Route path="/signup" element={<Signup/>} />

        {/* Protected Routes */}
        <Route path="/home" element={ <ProtectedRoute><Home/></ProtectedRoute>} />
        <Route path="/setting" element={ <ProtectedRoute><Seting/></ProtectedRoute>} />
        <Route path="/profile" element={ <ProtectedRoute><Profile/></ProtectedRoute>} />
        <Route path="/passwordChange" element={ <ProtectedRoute><PasswordChange/></ProtectedRoute>} />
        <Route path="/products" element={ <ProtectedRoute><Posts/></ProtectedRoute>} />
        <Route path="/product" element={ <ProtectedRoute><Post/></ProtectedRoute>} />
        <Route path="/claim" element={ <ProtectedRoute><Claim/></ProtectedRoute>} />
      </Routes>
    </Router>
  )
}

export default App