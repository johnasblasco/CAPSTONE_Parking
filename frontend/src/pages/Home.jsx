import { useNavigate } from 'react-router-dom';
const Home = () => {
      const navigate = useNavigate();

      const handleButtonAdmin = () => {
            navigate('/admin');
      };
      const handleButtonClient = () => {
            navigate('/client');
      };
      return (

            <div className="flex justify-center items-center h-screen">
                  <button
                        onClick={handleButtonAdmin}
                        className='border-2 p-2 rounded-lg hover:bg-sky-400 hover:text-white'
                  >
                        ADMIN
                  </button>
                  <button
                        onClick={handleButtonClient}
                        className='border-2 p-2 rounded-lg hover:bg-sky-400 hover:text-white'
                  >
                        CLIENT
                  </button>


            </div>
      )
}

export default Home