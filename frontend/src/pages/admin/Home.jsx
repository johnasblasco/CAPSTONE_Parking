import Header from "./components/Header"
import Navbar from "./components/Navbar"
import LoginHistory from "./pages/LoginHistory"
const Home = () => {

      return (
            <div className="h-screen">
                  <Header />
                  <Navbar />
                  <LoginHistory />
            </div>
      )
}

export default Home