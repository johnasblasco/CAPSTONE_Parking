import { useEffect, useState, createContext } from "react"
import LoginHistory from "./pages/LoginHistory"
import CreateAccount from "./pages/CreateAccount"
import ManageAccount from "./pages/ManageAccount"
import axios from "axios"
import { Routes, Route } from 'react-router-dom'

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
            <div className="min-h-screen">



                  <myContext.Provider value={myContextValue}>


                        <Routes>
                              <Route path="/login-history" element={<LoginHistory />} />
                              <Route path="/create-account" element={<CreateAccount />} />
                              <Route path="/manage-account" element={<ManageAccount />} />
                        </Routes>

                  </myContext.Provider>

            </div>

      )
}

export default Home