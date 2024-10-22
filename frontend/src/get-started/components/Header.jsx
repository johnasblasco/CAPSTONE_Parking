import { Link } from "react-router-dom"


const Header = ({ setMySwitch }) => {
      return (
            <header className="flex justify-between items-center font-bold text-white ">
                  <img className="cursor-pointer" src="logo.png" alt="" />
                  <nav className='flex gap-16 items-center text-xl'>
                        <button onClick={() => setMySwitch(true)} className="hover:scale-105 border-b-2 border-transparent focus:border-white">HOME</button>
                        <button onClick={() => setMySwitch(false)} className="hover:scale-105 border-b-2 border-transparent focus:border-white">ABOUT US</button>

                  </nav>
                  <Link to={'/login'} className=' hover:scale-90 text-bloe font-bold bg-yeelow hover:bg-bloe hover:border-white border-4 hover:text-yeelow py-3 text-xl px-8 rounded-3xl'>LOG IN</Link>
            </header>
      )
}

export default Header