import toast, { Toaster } from 'react-hot-toast';
import { IoMdClose } from "react-icons/io";


export const myToast = () => toast.custom((t) => (
      <div className='fixed w-screen h-screen bg-black/40'>


            <div
                  className={`${t.visible ? 'animate-enter' : 'animate-leave'
                        } relative lg:min-w-[40vw] md:max-w-[20vw] sm:max-w-[10vw]  bg-[#D9D9D9] top-10 left-[35vw] shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
            >
                  <div className='py-8 pl-8 pr-30'>
                        <IoMdClose onClick={() => toast.dismiss(t.id)} className='text-3xl absolute top-2 right-2 cursor-pointer' />

                        <div>
                              <h3 className='text-2xl'>Account Added!</h3>
                              <p>Account has been added to the database.</p>
                        </div>

                  </div>

            </div>
      </div>
))


