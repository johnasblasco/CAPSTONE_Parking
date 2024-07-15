import { useEffect, useState } from "react"
import Header from "./components/Header"
import Navbar from "./components/Navbar"
import LoginHistory from "./pages/LoginHistory"
import CreateAccount from "./pages/CreateAccount"
import ManageAccount from "./pages/ManageAccount"
import axios from "axios"
import { Routes, Route } from 'react-router-dom'
const Home = () => {

      const [employee, setEmployee] = useState([])
      useEffect(() => {
            axios.get("http://localhost:8000/admin/loginHistory")
                  .then(response => {
                        const updatedEmployees = response.data
                        setEmployee(updatedEmployees);

                  })
                  .catch(err => {
                        console.log(err)
                  })
      }, [])

      console.log(employee)
      return (
            <div className="min-h-screen">




                  <Routes>
                        <Route path="/login-history" element={<LoginHistory employee={employee} />} />
                        <Route path="/create-account" element={<CreateAccount />} />
                        <Route path="/manage-account" element={<ManageAccount />} />
                  </Routes>


            </div>

      )
}

export default Home