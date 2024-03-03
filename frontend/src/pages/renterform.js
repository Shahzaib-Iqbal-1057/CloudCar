import React from 'react'
import {CarForm} from '../components/rentForm.tsx'

const RenterForm = ({socket}) => {

  return (
    <CarForm socket = {socket} />
  )
}
export default RenterForm