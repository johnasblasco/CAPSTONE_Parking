import { Link } from "react-router-dom"


const Header = ({ setMySwitch }) => {
      return (
            <header className="flex justify-between items-center font-bold text-[#001858] ">
                  <h1 className="text-4xl font-extrabold text-slate-800">PARK AID</h1>
                  <nav className='flex gap-16 items-center text-2xl'>
                        <button onClick={() => setMySwitch(true)} className="border-b-2 border-transparent focus:border-black">HOME</button>
                        <button onClick={() => setMySwitch(false)} className="border-b-2 border-transparent focus:border-black">ABOUT US</button>

                  </nav>
                  <Link to={'/login'} className=' text-[#001858] font-bold bg-[#f582ae] hover:bg-[#eb518c] hover:text-[#fffeee] py-4 text-xl px-8 rounded-3xl'>LOGIN</Link>
            </header>
      )
}

export default Header