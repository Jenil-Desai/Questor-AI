
import Navbar from '../components/global/Navbar'
import { PinContainer } from '../components/ui/3dPin'
import { MacbookScroll } from '../components/ui/macbook-scroll'


const Dashboard = () => {
    
  return (
    <div>
        <Navbar />
        <MacbookScroll title={"Welcome to Your Learning Hub!"}/>
        <div>
            <PinContainer />
        </div>
    </div>
  )
}

export default Dashboard