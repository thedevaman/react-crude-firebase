import {useState,useEffect} from 'react'
import 'remixicon/fonts/remixicon.css'
import Swal from 'sweetalert2'
import firebaseConfigApp from './lib/firebase-config'
import {getFirestore,addDoc,collection,getDocs} from 'firebase/firestore'

const db = getFirestore(firebaseConfigApp)

const App = ()=>{

  const model = {
    employeeName : '',
    salary : '',
    joiningDate :''
}

  const[employees,setEmployees] = useState(model)
  const[isEmpty,setIsEmpty] = useState(false)

  useEffect(()=>{
  const req = async ()=>{
   const fetchdata = await getDocs(collection(db,"employees"))
   setIsEmpty(fetchdata.empty)
  }
  req()
  },[isEmpty])

const handleChange = (e)=>{
  const input = e.target
  const name = input.name
  const value = input.value
  setEmployees({
    ...employees,
    [name] : value
  })
}

const createEmployee = async (e)=>{
 try{
  e.preventDefault()
 const snapshot = await addDoc(collection(db,"employees"),employees);
 setIsEmpty(false);
 new Swal({
  icon:'success',
  title:'Success',
  text:'Added Successfully'

 })
 
 }
 catch(err){
 new Swal({
  icon:'error',
  title:'Failed',
  text:err.message
 })
 }
 finally{
  setEmployees(model)
 }
}
  return (
    <div className="flex flex-col items-center gap-16">
      <h1 className="text-5xl font-bold">Firebase <span className="text-indigo-600">Crud</span></h1>
      <div className="grid grid-cols-2 w-6/12 gap-16">
        <div>
          <form className="space-y-4" onSubmit={createEmployee}>
          <div className="flex flex-col">
            <label className="font-semibold text-lg mb-2">Employee Name</label>
            <input required
            onChange={handleChange}
            name="employeeName"
            value={employees.employeeName}
            className="p-3 rounded border border-grey-300"/>
            </div>

            <div className="flex flex-col">
            <label className="font-semibold text-lg mb-2">Salary</label>
            <input required
            type="number"
            onChange={handleChange}
            name="salary"
            value={employees.salary}
            className="p-3 rounded border border-grey-300"/>
            </div>

            <div className="flex flex-col">
            <label className="font-semibold text-lg mb-2">Joining Date</label>
            <input required
            onChange={handleChange}
            name="joiningDate"
            type="date"
            value={employees.joiningDate}
            className="p-3 rounded border border-grey-300"/>
            </div>

           <button className="bg-green-500 px-6 py-3 rounded font-semibold text-white">CREATE</button>

          </form>
        </div>
        <div>
          {
            isEmpty && 
            <div className='flex flex-col items-center'>
            <i className='ri-u-disk-line text-3xl text-gray-500'></i>
            <h1 className='text-3xl font-semibold text-gray-500'>Empty</h1>
          </div>
          }
        </div>
      </div>
    </div>
  )
}

export default App