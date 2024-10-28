import React from 'react'
import briefcase from '../../../assets/images/mainpage_images/briefcase-solid 1.png'
import Button from '../../ui/Button/Button'

const BusinessButton: React.FC = () => {
  return (
    <Button  variant='black' icon={briefcase}>
      Для бизнеса
    </Button>
  )
}

export default BusinessButton
