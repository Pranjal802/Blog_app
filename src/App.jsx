import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import './App.css'
import authService from './appwrite/auth'
import {login, logout} from './store/authSlice'
import { Footer, Header } from './Components'
import { Outlet } from 'react-router-dom'
import Input from './Components/Input'

function App() {
  const [loading, setLoading] = useState(true)

  const dispatch = useDispatch()

  useEffect(()=>{
    authService.getCurrentUser()

    .then( (userData) => { 
      if(userData)
      {
        dispatch(login({userData}))
      }
      else{
        dispatch(logout());
      }
    })

    .finally( () => setLoading(false) )

  },[])

  // console.log(import.meta.env.VITE_APPWRITE_URL);
  const authStatus = useSelector( (state) => state.auth.status)


  return !loading ?(
    <div className='min-h-screen flex flex-wrap content-between'>
      <div className='w-full block'>
          <Header/>
          <main>
            Main Content
            {
              !authStatus &&
              <div>
                <p className='text-white text-4xl mt-5'>"Write, Share, and Connect with the World."</p>
                <Input label="Name"/>
              </div>
            }
            {/* <Outlet/> */}
          </main>
          <Footer/>
      </div>
    </div>
  ) : null
}

export default App
