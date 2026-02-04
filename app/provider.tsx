'use client'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { UserDetailsContext } from '@/Context/UserDetailsContext'

const Provider = ({children}: {children: React.ReactNode}) => {
    const [userDetails,setUserDetails] = useState()

    const createNewUser = async ()=>{
        try {
            const response = await axios.post('/api/user')
            console.log('User data:', response.data)
            setUserDetails(response?.data)
            if(response.status === 201){
                toast.success(response.data.message)
            }else{
                toast.error(response.data.message)
            }
        } catch (error) {
            console.error('Error creating user:', error)
            if(axios.isAxiosError(error)){
                console.error('Error response:', error.response?.data)
                console.error('Error status:', error.response?.status)
                if(error.response?.data?.message){
                    toast.error(error.response.data.message)
                } else {
                    toast.error('Failed to create user')
                }
            } else {
                console.error('Unknown error:', error)
                toast.error('Failed to create user')
            }
        }
    }

    useEffect(() => {
        const id = setTimeout(() => createNewUser(), 0)
        return () => clearTimeout(id)
    }, [])
  return (
    <div>
        <UserDetailsContext.Provider value={{ userDetails, setUserDetails }}>
             {children}
             </UserDetailsContext.Provider>
        <ToastContainer position="top-right" autoClose={3000} />
    </div>
  )
}

export default Provider