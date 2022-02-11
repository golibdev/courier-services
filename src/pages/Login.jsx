import React, {useEffect, useState} from 'react'
import { authApi } from '../api/authApi'
import { toast, ToastContainer } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { isAuthentification } from '../handlers/isAuthentification'

const Login = () => {
   const [username, setUsername] = useState('')
   const [password, setPassword] = useState('')
   const navigate = useNavigate()

   const token = localStorage.getItem('token')
   const isAuth = isAuthentification(token)
   useEffect(() => {
      if(isAuth === undefined) {
        navigate('/');
      } else {
        navigate('/login');
      }
   }, [navigate]);

   const login = async (e) => {
      e.preventDefault()

      const check = {
         username: username.trim().length === 0,
         password: password.trim().length === 0
      }

      if(check.username || check.password) {
         toast.error('Barcha maydonlar to\'ldirilishi shart!')
         return
      }

      if(password.length < 6) {
         toast.error('Parol 6 ta belgidan kam bo\'lishi shart!')
         return
      }

      const params = {
         username,
         password
      }

      try {
         const res = await authApi.login(params)
         localStorage.setItem('token', res.data.token)
         localStorage.setItem('fullName', res.data.admin.fullName)
         localStorage.setItem('role', res.data.admin.role)
         navigate('/')
      } catch(err) {
         console.log(err.response);
      }
   }
   return (
      <div id="layoutAuthentication">
         <div id="layoutAuthentication_content">
            <main>
               <div className="container">
                  <div className="row">
                     <div className="col-lg-6 offset-lg-3">
                        <div className="card shadow-lg border-0 rounded-lg mt-5">
                           <div className="card-header"><h3 className="text-center font-weight-light my-4">Login</h3></div>
                           <div className="card-body">
                              <form onSubmit={login}>
                                 <div className="form-floating mb-3">
                                    <input className="form-control" id="inputEmail" type="text" placeholder="name@example.com" value={username} onChange={e => setUsername(e.target.value)} />
                                    <label htmlFor="inputEmail">Username</label>
                                 </div>
                                 <div className="form-floating mb-3">
                                    <input className="form-control" id="inputPassword" type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
                                    <label htmlFor="inputPassword">Password</label>
                                 </div>
                                 <div className="d-flex align-items-center justify-content-between mt-4 mb-0">
                                    <button className="btn btn-primary">Login</button>
                                 </div>
                              </form>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </main>
            <ToastContainer/>
         </div>
      </div>
   )
}

export default Login