import React, {useEffect} from 'react'
import { FinancialInfoCard } from '../components/FinancialInfoCard'
import { Loader } from '../components/Loader'

export default function FinancialInfo() {

  useEffect(() => {
    const token = localStorage.getItem('Token')
    if (!token){
      window.location.href = "/login"
    }
  }, [])

  return (
    <>
    <FinancialInfoCard/>
    </>
  )
}
