import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AppLayout from './AppLayout/AppLayout'
import { Navbar } from './components/Navbar'
import { Dashboard } from './pages/Dashboard'
import Login from './pages/Login'
import 'react-toastify/dist/ReactToastify.css';
import Client from './pages/Client'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login/>} />
        <Route path='' element={<AppLayout/>} />
        <Route element={<AppLayout/>}>
          <Route index element={<Dashboard/>} />
          <Route path='clients' element={<Client/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
