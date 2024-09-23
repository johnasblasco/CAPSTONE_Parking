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
            <div className="bg-cover bg-no-repeat h-screen object-center " style={{ backgroundImage: 'url(bg.jpeg)', objectPosition: 'bottom 10px right 20px' }}>

                  <div className="flex items-center justify-center h-screen">

                        {/* background na mejo itim para pang takip sa masakit na damdamin*/}
                        <div className="absolute top-0 bottom-0 right-0 left-0 bg-gray opacity-20 "></div>


                        <div className="flex flex-col justify-between items-center gap-2 max-w-sm p-12 pb-8 bg-gray-200 rounded-xl shadow-md overflow-x-hidden z-10"
                              style={{ height: '85vh' }}>

                              <img src="logo.png" className="pt-4 object-cover opacity-1" />


                              <div className='flex flex-col items-center gap-4'>
                                    <p className='text-center'>continue as:</p>
                                    <button
                                          onClick={handleButtonUser}
                                          className='rounded-xl bg-blue-900 hover:bg-blue-950 text-white text-xl px-20 py-6'
                                    >
                                          User
                                    </button>
                                    <button
                                          onClick={handleButtonAdmin}
                                          className='rounded-xl bg-blue-900 hover:bg-blue-950 w-fit py-2 px-4 text-white text-xs'
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

