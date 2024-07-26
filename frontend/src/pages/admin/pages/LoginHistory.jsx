import moment from 'moment'
import Navbar from '../components/Navbar';
import Header from '../components/Header';
import { useContext } from 'react';
import { myContext } from '../Home';
const LoginHistory = () => {

      const [employee] = useContext(myContext)


      return (
            <>
                  <Header />

                  <div className='absolute left-[200px] top-[100px] lg:overflow-x-hidden max-lg:hidden'>
                        <div className="mx-4 bg-[#D9D9D9] min-h-screen rounded-3xl" style={{ width: 'calc(100vw - 250px)' }}>
                              <div className="title flex justify-center">
                                    <h2 className='text-5xl my-8 font-extrabold' >Login History</h2>
                              </div>

                              {/* CONTENT */}

                              <div className="bg-[#D6D0C4] mx-8 rounded-3xl min-h-screen h-auto ">

                                    <div className="flex justify-center">
                                          <span className='bg-[#94AB95] px-4 py-1 m-4 rounded-2xl '>List</span>
                                    </div>


                                    <table className='w-11/12 mx-auto my-8 '>
                                          <thead>
                                                <tr>
                                                      <th>Number</th>
                                                      <th>Employee Name</th>
                                                      <th>Time In</th>
                                                      <th>Time Out</th>
                                                      <th>Date</th>
                                                </tr>
                                                <tr>
                                                      <td className='bg-gray-950 p-[0.1px]' colSpan="5" />
                                                </tr>
                                                <tr>
                                                      <td><br /></td>
                                                </tr>
                                          </thead>
                                          <tbody className='mt-4'>
                                                {employee.map((emp, index) => (
                                                      <tr key={index} className='hover:bg-[#C9B7B7] rounded-3xl'>
                                                            <td className='text-center'>{index + 1}</td>
                                                            <td className='text-center'>{emp.name}</td>
                                                            <td className='text-center'>{moment(emp.timeIn).format('h:mm a')}</td>
                                                            <td className='text-center'>{emp.timeOut === null ? "-" : moment(emp.timeOut).format('h:mm a')}</td>
                                                            <td className='text-center'>{emp.timeOut === null ? "-" : moment(emp.timeIn).format('DD/MM/YY')}</td>
                                                      </tr>
                                                ))}
                                          </tbody>
                                    </table>

                              </div>

                        </div>
                  </div >

                  {/* NAV */}
                  <Navbar />
            </>
      )
}

export default LoginHistory