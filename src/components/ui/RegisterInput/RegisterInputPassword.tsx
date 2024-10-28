import React from 'react'


const RegisterInput:React.FC = () => {
  
  return (
    <input style={{
        width:'100%',
        backgroundColor:'#F4F3F1',
        height:'auto',
        borderRadius:'8px',
        fontSize:'18px',
        paddingTop:'8px',
        paddingBottom:'8px',
        
        }} required  type='password' placeholder='Пароль'/>
        
  )
}

export default RegisterInput
