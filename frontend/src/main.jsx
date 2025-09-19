import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter,createRoutesFromElements,Route,RouterProvider } from 'react-router-dom'
import Home1 from './component/Home1/Home1.jsx'
import About1 from './component/About1/About1.jsx'
import WorkingDemo1 from './component/WorkingDemo1/WorkingDemo1.jsx'
import ContactUs1 from './component/ContactUs1/ContactUs1.jsx'
import Layout from './Layout.jsx'
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layout/>}>
      <Route path='/' element={<Home1/>}/>
      <Route path='/About1' element={<About1/>}/>
      <Route path='/WorkingDemo1' element={<WorkingDemo1/>}/>
      <Route path='/ContactUs1' element={<ContactUs1/>}/>
    </Route>
  )
)
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
