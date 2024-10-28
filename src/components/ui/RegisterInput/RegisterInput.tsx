import React from 'react'
import { IRegisterInput } from '../../../interface/modal.props'

const RegisterInput: React.FC<IRegisterInput> = ({ type, placeholder, id, name, value, handlePasswordChange, setFocusInput }) => {
  return (
    <input style={{
      width: '100%',
      backgroundColor: '#F4F3F1',
      height: 'auto',
      borderRadius: '8px',
      fontSize: '18px',
      paddingTop: '8px',
      paddingBottom: '8px',

    }} onFocus={setFocusInput} onChange={handlePasswordChange} name={name} value={value} required id={id} type={type} placeholder={placeholder} />
  )
}

export default RegisterInput
