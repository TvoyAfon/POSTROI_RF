import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addOrderWorkersData } from '../../../store/slices/data/OrderDataWorkers'
import { RootState } from '../../../store/store'
import FilesUploader from '../../ui/FilesUploader/FilesUploader'

import { addClickFlag, addInputDescriptionError } from '../../../store/slices/validation/CreateOrderValidationSlice'
import CreateOrderTextArea from '../../ui/CreateOrderTextArea/CreateOrderTextArea'

const CreateOrderWorkersTask: React.FC = () => {

  useEffect(() => {
    dispatch(addClickFlag(false))
  }, [])

  const dispatch = useDispatch()
  const { dataWorkers } = useSelector((state: RootState) => state.createOrderWorkersData)
  const { error } = useSelector((state: RootState) => state.createOrderValidation)

  const handleChangeDescription = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    dispatch(addOrderWorkersData({ ...dataWorkers, description: e.target.value }))
    dispatch(addInputDescriptionError(e.target.value))
  }


  return (
    <div className='flex-column gap-medium'>
      <span style={{ fontWeight: 700, fontSize: 16 }}>Что нужно будет сделать </span>
      <CreateOrderTextArea value={dataWorkers.description} onChange={handleChangeDescription} />
      {error.inputDescriptionError && dataWorkers.description.length === 0 && <error.inputDescriptionError />}
      <FilesUploader />
    </div>
  )

}

export default CreateOrderWorkersTask
