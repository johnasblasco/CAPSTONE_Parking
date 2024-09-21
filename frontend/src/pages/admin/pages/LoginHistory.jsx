import moment from 'moment'
import { useContext } from 'react';
import { myContext } from '../Home';
const LoginHistory = () => {

      const [employee] = useContext(myContext)


      return (
            <>
                  <div className='mx-[10%] h-max-700:mt-[35vh] mt-[25vh] w-[80vw] text-deepBlue'>



                        {/* CONTENT */}

                        <div className="relative pt-12 shadow-2xl border-4 border-bloe bg-white mx-8  rounded-3xl min-h-screen h-auto ">


                              <p className='border-4 font-bold border-deepBlue absolute top-4 left-[-35px] bg-vanilla py-1 px-8 text-lg rounded-3xl '>Login History</p>


                              <table className='w-11/12 mx-auto my-8'>
                                    <thead>
                                          <tr className='border-b-4 border-bloe'>
                                                <th className='border-r-4 border-bloe'>Number</th>
                                                <th className='border-r-4 border-bloe'>Employee Name</th>
                                                <th className='border-r-4 border-bloe'>Time In</th>
                                                <th className='border-r-4 border-bloe'>Time Out</th>
                                                <th>Date</th>
                                          </tr>


                                    </thead>
                                    <tbody className='mt-4'>
                                          {employee.map((emp, index) => (
                                                <tr key={index} className='hover:bg-[#C9B7B7] rounded-3xl'>
                                                      <td className='text-center border-r-4 border-bloe'>{index + 1}</td>
                                                      <td className='text-center border-r-4 border-bloe'>{emp.name}</td>
                                                      <td className='text-center border-r-4 border-bloe'>{moment(emp.timeIn).format('h:mm a')}</td>
                                                      <td className='text-center border-r-4 border-bloe'>{emp.timeOut === null ? "-" : moment(emp.timeOut).format('h:mm a')}</td>
                                                      <td className='text-center '>{emp.timeOut === null ? "-" : moment(emp.timeIn).format('DD/MM/YY')}</td>
                                                </tr>
                                          ))}
                                    </tbody>
                              </table>

                        </div>

                  </div>


            </>
      )
}

export default LoginHistory