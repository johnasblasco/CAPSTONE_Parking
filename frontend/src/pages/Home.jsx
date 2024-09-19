import { useNavigate } from 'react-router-dom';
const Home = () => {
      const navigate = useNavigate();

      const handleButtonAdmin = () => {
            navigate('/admin');
      };
      const handleButtonUser = () => {
            navigate('/user');
      };
      return (
            <div className="min-h-screen  bg-[#F3D2C1] ">

                  <div className="flex items-center justify-center h-screen">


                        <div className="flex flex-col items-center gap-2 p-12 pb-8 bg-[url('polygon1.png')] w-[650px] h-[650px] bg-contain bg-no-repeat rounded-xl "
                        >

                              <img src="ei_user.png" className="pt-4 object-cover opacity-1" />


                              <div className='flex flex-col items-center gap-4'>
                                    <button
                                          onClick={handleButtonUser}
                                          className='rounded-3xl text-[#001858] border-4 border-[#001858] text-2xl font-extrabold py-2 px-16 bg-[#8ED8A9]'
                                    >
                                          USER
                                    </button>
                                    <button
                                          onClick={handleButtonAdmin}
                                          className='rounded-3xl text-[#001858] border-4 border-[#001858] text-2xl font-extrabold py-2 px-14 bg-[#8ED8A9]'
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

