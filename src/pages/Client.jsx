import React, {useEffect, useState} from 'react'
import { clientApi } from '../api/clientApi'
import { toast } from 'react-toastify'

const Client = () => {
   const [fullName, setFullName] = useState('')
   const [number, setNumber] = useState('')
   const [data, setData] = useState([])
   const [isLoading, setIsLoading] = useState(false)
   const [updateFullName, setUpdateFullName] = useState('')
   const [updateNumber, setUpdateNumber] = useState('')
   const [searchFilter, setSearchFilter] = useState('')

   const getAll = async () => {
      try {
         const res = await clientApi.getAll()
         res.data.clients ? setData(res.data.clients.reverse()) : setData([])
         setIsLoading(true)
      } catch (err) {
         setData([])
      }
   }

   useEffect(() => {
      getAll()
   }, [])

   const createClient = async (e) => {
      e.preventDefault()
      const check = {
         fullName: fullName.trim().length === 0,
         number: number.length === 0
      }

      if (check.fullName || check.number) {
         toast.error("Barcha ma'lumotlar to'ldirishi shart")
         return
      }

      const params = {
         fullName: fullName,
         number: Number(number)
      }
      try {
         await clientApi.create(params)
         toast.success("Mijoz yaratildi")
         setFullName('')
         setNumber('')
         getAll()
      } catch (err) {
         if(err.response.status === 400) {
            toast.error("Bunday mijoz oldin ro'yxatdan o'tkazilgan")
         } else {
            toast.error("Xatolik")
         }
      }
   }

   const deleteClient = async (e, id) => {
      try {
         await clientApi.delete(id)
         toast.success("Mijoz o'chirildi")
         getAll()
      } catch (err) {
         console.log(err);
      }
   }

   const updateClient = async (e, id) => {
      e.preventDefault()
      const check = {
         fullName: updateFullName.trim().length === 0,
         number: updateNumber.length === 0
      }

      if (check.fullName || check.number) {
         toast.error("Barcha ma'lumotlar to'ldirishi shart")
         return
      }

      const params = {
         fullName: updateFullName,
         number: Number(updateNumber)
      }
      try {
         await clientApi.update(id, params)
         toast.success("Mijoz tahrirlandi")
         window.location.reload()
      } catch (err) {
         if(err.response.status === 400) {
            toast.error("Bunday mijoz oldin ro'yxatdan o'tkazilgan")
         } else {
            toast.error("Xatolik")
         }
      }
   }

   const filter = data.filter(item => item.fullName.toLowerCase().includes(searchFilter.toLowerCase()) || item.number.toString().includes(searchFilter))
   return (
      <div id='layoutSidenav_content'>
         <main>
            <div className='container-fluid px-4 mt-4'>
               <h3 className='fw-bold text-uppercase'>Clients</h3>

               <form className='row' onSubmit={createClient}>
                  <div className='col-lg-6 col-md-6 col-12 mb-3'>
                     <input type="number" className='form-control' placeholder='client number' value={number} onChange={e => setNumber(e.target.value)} />
                  </div>
                  <div className='col-lg-6 col-md-6 col-12 mb-3'>
                     <input type="text" className='form-control' placeholder='fullName' value={fullName} onChange={e => setFullName(e.target.value)}  />
                  </div>
                  <div className='col-lg-6 col-md-6 col-12 mb-3'>
                     <button className='btn btn-success'>
                        <i className='fas fa-plus'></i> Create
                     </button>
                  </div>
               </form>

               <div className='row'>
                  <div className="col-12">
                     <input type="text" className='form-control mb-3' placeholder='search client number or fullName' value={searchFilter} onChange={e => setSearchFilter(e.target.value)} />
                     {data.length > 0 ? (
                        <div className='table-responsive'>
                        {isLoading ? (
                              <table className='table table-striped table-bordered table-hover text-center'>
                                 <thead>
                                    <tr>
                                       <td>#</td>
                                       <td>FullName</td>
                                       <td>Number</td>
                                       <td>Update</td>
                                       <td>Delete</td>
                                    </tr>
                                 </thead>
                                 <tbody>
                                    {searchFilter.length > 0 ? (
                                       <>
                                          {filter.map((item, index) => (
                                             <tr key={index}>
                                                <td>{index + 1}</td>
                                                <td>{item.fullName}</td>
                                                <td>{item.number}</td>
                                                <td>
                                                   <button className='btn btn-warning text-white' data-bs-toggle="modal" data-bs-target={`#exampleModal${item._id}`} onClick={() => {
                                                      setUpdateFullName(item.fullName)
                                                      setUpdateNumber(item.number)
                                                   }} >
                                                      <i className='fas fa-edit'></i>
                                                   </button>

                                                   <div className="modal fade" id={`exampleModal${item._id}`} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                                      <div className="modal-dialog">
                                                         <div className="modal-content">
                                                            <div className="modal-header">
                                                               <h5 className="modal-title" id="exampleModalLabel">Update Clients</h5>
                                                               <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                            </div>
                                                            <div className="modal-body">
                                                               <form>
                                                                  <div className='mb-3'>
                                                                     <input type="number" className='form-control' placeholder='client number' value={updateNumber} onChange={e => setUpdateNumber(e.target.value)} />
                                                                  </div>
                                                                  <div className='mb-3'>
                                                                     <input type="text" className='form-control' placeholder='fullName' value={updateFullName} onChange={e => setUpdateFullName(e.target.value)}  />
                                                                  </div>
                                                                  <div className='mb-3'>
                                                                     <button className='btn btn-success d-block' onClick={(e) => {
                                                                        updateClient(e, item._id)
                                                                     }}>
                                                                        <i className='fas fa-save'></i> Save
                                                                     </button>
                                                                  </div>
                                                               </form>
                                                            </div>
                                                            <div className="modal-footer">
                                                               <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                                            </div>
                                                         </div>
                                                      </div>
                                                   </div>
                                                </td>
                                                <td>
                                                   <button className='btn btn-danger mr-2' onClick={(e) => {
                                                      deleteClient(e, item._id)
                                                   }}>
                                                      <i className='fas fa-trash'></i>
                                                   </button>
                                                </td>
                                             </tr>
                                          ))}  
                                       </> 
                                    ): (
                                       <>
                                          {data.map((item, index) => (
                                          <tr key={index}>
                                             <td>{index + 1}</td>
                                             <td>{item.fullName}</td>
                                             <td>{item.number}</td>
                                             <td>
                                                <button className='btn btn-warning text-white' data-bs-toggle="modal" data-bs-target={`#exampleModal${item._id}`} onClick={() => {
                                                   setUpdateFullName(item.fullName)
                                                   setUpdateNumber(item.number)
                                                }} >
                                                   <i className='fas fa-edit'></i>
                                                </button>

                                                <div className="modal fade" id={`exampleModal${item._id}`} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                                   <div className="modal-dialog">
                                                      <div className="modal-content">
                                                         <div className="modal-header">
                                                            <h5 className="modal-title" id="exampleModalLabel">Update Clients</h5>
                                                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                         </div>
                                                         <div className="modal-body">
                                                            <form>
                                                               <div className='mb-3'>
                                                                  <input type="number" className='form-control' placeholder='client number' value={updateNumber} onChange={e => setUpdateNumber(e.target.value)} />
                                                               </div>
                                                               <div className='mb-3'>
                                                                  <input type="text" className='form-control' placeholder='fullName' value={updateFullName} onChange={e => setUpdateFullName(e.target.value)}  />
                                                               </div>
                                                               <div className='mb-3'>
                                                                  <button className='btn btn-success d-block' onClick={(e) => {
                                                                     updateClient(e, item._id)
                                                                  }}>
                                                                     <i className='fas fa-save'></i> Save
                                                                  </button>
                                                               </div>
                                                            </form>
                                                         </div>
                                                         <div className="modal-footer">
                                                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                                         </div>
                                                      </div>
                                                   </div>
                                                </div>
                                             </td>
                                             <td>
                                                <button className='btn btn-danger mr-2' onClick={(e) => {
                                                   deleteClient(e, item._id)
                                                }}>
                                                   <i className='fas fa-trash'></i>
                                                </button>
                                             </td>
                                          </tr>
                                       ))} 
                                       </> 
                                    )}
                                 </tbody>
                              </table>
                           ): (
                              <div>Loading...</div>
                           )}
                        </div>
                     ): (
                        <div className='alert alert-danger'>No data</div>
                     )}
                  </div>
               </div>
            </div>
         </main>
      </div>
   )
}

export default Client