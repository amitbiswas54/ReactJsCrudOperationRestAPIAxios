import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Listing from './pages/Listing'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <div className='container lg:max-w[80%] px-10'> 
      <h2 className="text-4xl font-bold text-yellow-300 py-5 text-center ">
        React Js Crud Operation Rest API Axios</h2>

        <p className='text-white text-center'>A fully functional React JS CRUD application 
          that interacts with a REST API using Axios. The project includes 
          features to Create, Read, Update, and Delete data with real-time 
          UI updates. It uses React Hooks, Axios, and modular components to 
          ensure clean code structure and maintainability. Designed with 
          responsive UI and proper error handling for production-ready API 
          integration.</p>
      <Listing />
      </div>
    </>
  )
}

export default App
