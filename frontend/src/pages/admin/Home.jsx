import { useEffect, useState, createContext } from "react"
import LoginHistory from "./pages/LoginHistory"
import CreateAccount from "./pages/CreateAccount"
import ManageAccount from "./pages/ManageAccount"
import Settings from './pages/Settings'
import axios from "axios"
import { Routes, Route } from 'react-router-dom'

import Header from './components/Header'
import Navbar from "./components/Navbar"

export const myContext = createContext();


const Home = () => {

      const [employee, setEmployee] = useState([])


      const myContextValue = [employee]


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
            <div className='bg-no-repeat bg-bottom bg-[url("/BG.png")] bg-cover w-full fixed overflow-auto'>

                  <Header />
                  <myContext.Provider value={myContextValue}>
                        <div className='h-screen overflow-y-auto overflow-x-hidden'>
                              <Routes>

                                    <Route path="/settings" element={<Settings />} />
                                    <Route path="/login-history" element={<LoginHistory />} />
                                    <Route path="/create-account" element={<CreateAccount />} />
                                    <Route path="/manage-account" element={<ManageAccount />} />
                              </Routes>
                        </div>
                  </myContext.Provider>
                  <Navbar />
            </div>

      )
}

export default Home