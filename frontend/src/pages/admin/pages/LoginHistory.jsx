import React, { useContext, useRef } from 'react';
import { myContext } from '../Home';
import { MdLocalPrintshop } from "react-icons/md";
import moment from 'moment';

const LoginHistory = () => {
      const [employee] = useContext(myContext);
      const tableRef = useRef(null);

      const handlePrint = () => {
            if (!tableRef.current) {
                  console.error("Table reference is missing");
                  return;
            }

            const printWindow = window.open('', '', 'height=842,width=595');
            if (!printWindow) {
                  console.error("Failed to open print window");
                  return;
            }

            const tableContent = tableRef.current.innerHTML;

            // Structure the login history table information
            const printContent = `
                  <html>
                      <head>
                          <title>Print Login History</title>
                          <style>
                              @media print {
                                  @page { size: A4; margin: 20mm; }
                                  body { font-family: Arial, sans-serif; margin: 0; }
                                  table { width: 100%; border-collapse: collapse; }
                                  th, td { border: 1px solid black; padding: 8px; text-align: center; }
                                  th { background-color: #f2f2f2; }
                              }
                          </style>
                      </head>
                      <body>
                          <div style="padding: 20px;">
                              <h1 style="text-align: center;">Login History</h1>
                              <table>
                                  <thead>
                                      <tr>
                                          <th>Number</th>
                                          <th>Employee Name</th>
                                          <th>Time In</th>
                                          <th>Time Out</th>
                                          <th>Date</th>
                                      </tr>
                                  </thead>
                                  <tbody>
                                      ${employee.map((emp, index) => `
                                          <tr>
                                              <td>${index + 1}</td>
                                              <td>${emp.name}</td>
                                              <td>${moment(emp.timeIn).format('h:mm a')}</td>
                                              <td>${emp.timeOut ? moment(emp.timeOut).format('h:mm a') : '-'}</td>
                                              <td>${moment(emp.timeIn).format('DD/MM/YY')}</td>
                                          </tr>
                                      `).join('')}
                                  </tbody>
                              </table>
                          </div>
                          <script>window.onload = () => window.print();</script>
                      </body>
                  </html>
            `;

            printWindow.document.open();
            printWindow.document.write(printContent);
            printWindow.document.close();
            printWindow.focus();
      };

      return (
            <div className='mx-[10%] h-max-700:mt-[35vh] mt-[25vh] w-[80vw] text-deepBlue'>
                  <div className="relative pt-12 shadow-2xl border-4 border-bloe bg-white mx-8 rounded-3xl min-h-screen h-auto">
                        <p className='border-4 font-bold border-deepBlue absolute top-4 left-[-35px] bg-yeelow py-1 px-8 text-lg rounded-3xl '>Login History</p>

                        <div className='flex justify-end items-center mx-16'>
                              <button onClick={handlePrint} className='font-extrabold m-4 h-12 text-end bg-bloe hover:scale-95 rounded-2xl p-2 text-white'>
                                    <MdLocalPrintshop className='inline text-2xl' /> Print Reports
                              </button>
                        </div>
                        <div ref={tableRef} className='mt-12'>
                              <table className='table-fixed border-collapse w-full'>
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
                                                      <td className='text-center'>{moment(emp.timeIn).format('DD/MM/YY')}</td>
                                                </tr>
                                          ))}
                                    </tbody>
                              </table>
                        </div>
                  </div>
            </div>
      );
};

export default LoginHistory;
