import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const Home = () => {
      const navigate = useNavigate();

      const handleButtonAdmin = () => {
            navigate('/admin');
      };
      const handleButtonUser = () => {

            // ifnotLoggedOut();
            navigate('/user');
      };
      // const ifnotLoggedOut = () => {
      //       axios.get('https://capstone-parking.onrender.com/admin/loginhistory')
      //             .then(response => {
      //                   const found = response.data.find(user => user.timeOut === null)
      //                   if (found) {
      //                         navigate('/user/home/dashboard')
      //                         return;
      //                   }
      //             })
      // };
      return (
            <div className="h-screen bg-[url('/BG.png')] bg-cover bg-bottom bg-no-repeat">

                  {/* back button */}
                  <div data-aos="fade-down" className='absolute w-40 h-32 left-12 cursor-pointer top-2 hover:scale-y-90 '>
                        <img onClick={() => navigate("/")} src="/BACK.png" alt="" className='absolute  left-12 cursor-pointer top-[-30px] hover:scale-y-90 ' />
                  </div>

                  <div className="flex items-center justify-center h-screen">

                        <div className="flex flex-col items-center gap-2 pt-12 pr-24 pb-8 bg-[url('/polygon1.png')] w-[650px] h-[650px] laptop:h-[550px] laptop:w-[550px] bg-contain bg-no-repeat rounded-xl "
                        >
                              <p className='text-6xl text-darkBloe font-extrabold'>SIGN IN</p>
                              <p className='text-xl text-darkBloe font-bold'>TO PARKAID</p>
                              <img src="ei_user.png" className="laptop:w-[170px] pt-4 object-cover opacity-1" />


                              <div className='flex flex-col items-center gap-4'>
                                    <button
                                          onClick={handleButtonUser}
                                          className='rounded-3xl text-bloe border-4 hover:scale-90 border-bloe text-2xl font-extrabold py-2 px-16 bg-yeelow'
                                    >
                                          USER
                                    </button>
                                    <button
                                          onClick={handleButtonAdmin}
                                          className='rounded-3xl text-offWhite hover:scale-90 border-4 border-offWhite text-2xl font-extrabold py-2 px-14 bg-bloe'
                                    >
                                          ADMIN
                                    </button>

                              </div>

                        </div>
                  </div>
            </div>
      );

}

export default Home

