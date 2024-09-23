import { Link } from "react-router-dom"


const Header = ({ setMySwitch }) => {
      return (
            <header className="flex justify-between items-center font-bold text-white ">
                  <img src="logo.png" alt="" />
                  <nav className='flex gap-16 items-center text-xl'>
                        <button onClick={() => setMySwitch(true)} className="border-b-2 border-transparent focus:border-white">HOME</button>
                        <button onClick={() => setMySwitch(false)} className="border-b-2 border-transparent focus:border-white">ABOUT US</button>

                  </nav>
                  <Link to={'/login'} className=' text-bloe font-bold bg-yeelow hover:bg-bloe hover:border-white border-4 hover:text-yeelow py-4 text-xl px-8 rounded-3xl'>LOG IN</Link>
            </header>
      )
}

export default Header