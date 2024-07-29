import { useState } from 'react'
import Navbar from './components/Navbar'
import Manager from './components/Manager'
import Footer from './components/Footer'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Navbar/>
    <div className='min-h-[80vh] absolute w-full'>
      <Manager/>
      <Footer/>
    </div>
    </>
  )
}

export default App
