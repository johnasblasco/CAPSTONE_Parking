import { IoMdClose } from "react-icons/io";


const Toast = ({ setShowToast }) => {
      return (
            <div onClick={() => setShowToast(false)} className='fixed w-screen h-screen bg-black/40 flex justify-center z-50'>
                  <div className='bg-white relative top-10 w-[600px] h-fit p-12 rounded-2xl'>
                        <IoMdClose onClick={() => setShowToast(false)} className='text-4xl absolute top-2 right-2 cursor-pointer' />

                        <div>
                              <h3 className='text-2xl'>Account Added!</h3>
                              <p>Account has been added to the database.</p>
                        </div>

                  </div>

            </div>
      )
}




export default Toast;
