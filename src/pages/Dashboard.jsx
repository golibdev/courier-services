import React from 'react'
import { Link } from 'react-router-dom'

export const Dashboard = () => {
   return (
      <div id='layoutSidenav_content'>
         <main>
            <div className='container-fluid px-4 mt-4'>
               <div className='row'>
                  <div className='col-lg-3 col-md-4 col-sm-6 col-12 mb-4'>
                     <div class="card bg-primary text-white mb-4">
                        <div class="card-body">New Orders</div>
                        <div class="card-footer d-flex align-items-center justify-content-between">
                           <Link class="small text-white stretched-link" to="/new-orders">View Detail</Link>
                           <div class="small text-white"><i class="fas fa-angle-right"></i></div>
                        </div>
                     </div>
                  </div>
                  <div className='col-lg-3 col-md-4 col-sm-6 col-12 mb-4'>
                     <div class="card bg-primary text-white mb-4">
                        <div class="card-body">Flights orders</div>
                        <div class="card-footer d-flex align-items-center justify-content-between">
                           <Link class="small text-white stretched-link" to="/flights-orders">View Detail</Link>
                           <div class="small text-white"><i class="fas fa-angle-right"></i></div>
                        </div>
                     </div>
                  </div>
                  <div className='col-lg-3 col-md-4 col-sm-6 col-12 mb-4'>
                     <div class="card bg-primary text-white mb-4">
                        <div class="card-body">Recive orders</div>
                        <div class="card-footer d-flex align-items-center justify-content-between">
                           <Link class="small text-white stretched-link" to="/recive-orders">View Detail</Link>
                           <div class="small text-white"><i class="fas fa-angle-right"></i></div>
                        </div>
                     </div>
                  </div>
                  <div className='col-lg-3 col-md-4 col-sm-6 col-12 mb-4'>
                     <div class="card bg-primary text-white mb-4">
                        <div class="card-body">Submit Orders</div>
                        <div class="card-footer d-flex align-items-center justify-content-between">
                           <Link class="small text-white stretched-link" to="/submit-orders">View Detail</Link>
                           <div class="small text-white"><i class="fas fa-angle-right"></i></div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </main>
      </div>
   )
}
