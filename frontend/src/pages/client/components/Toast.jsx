import { IoMdClose } from "react-icons/io";


const Toast = ({ setShowToast, title, disc, showToast, displayTicket }) => {

      const handleButton = () => {
            setShowToast("")
      }

      return (

            <div onClick={handleButton} className='fixed w-screen h-screen bg-black/40 flex justify-center z-50'>
                  <div className='bg-[#D9D9D9] font-light relative top-10 w-[550px] h-fit py-8 px-12 rounded-2xl z-100'>
                        <IoMdClose onClick={handleButton} className='text-4xl absolute top-2 right-2 cursor-pointer' />

                        <div>
                              <h3 className='text-2xl font-[400]'>{title}</h3>
                              <p>{disc}</p>
                        </div>

                  </div>

                  {
                        showToast == "in" && (

                              <div className='overflow-y-auto absolute bottom-0 right-14 '>
                                    <p className="my-2 mx-8 bg-[#D9D9D9]  py-4 rounded-2xl text-center text-xl font-light">Ticket is printed</p>

                                    <div className="w-[350px] h-auto bg-white p-4">
                                          <hr className='border-slate-500 my-2' />

                                          <div className='flex flex-wrap justify-center'>
                                                <p className='px-6 text-center text-pretty'>immaculate conception parish Cathedral and Minor Basilica, Diocese of Malolos</p>
                                          </div>

                                          <p className='text-sm mt-8 ml-6'>Ticket no.</p>
                                          <p className='text-center text-6xl tracking-widest font-bold'>{displayTicket}</p>
                                          <p className='text-center mt-3 mx-16 text-sm'>valid for 3 hours parking. overtime will be fined.</p>

                                          <p className='text-center mt-3 mx-2 text-sm'>this ticket serves as the pass for the exit. Please keep it until you exit the parking lot. Thank you.</p>
                                          <hr className='border-slate-500 my-2' />
                                    </div>

                              </div>

                        )
                  }

            </div>
      )
}




export default Toast;
