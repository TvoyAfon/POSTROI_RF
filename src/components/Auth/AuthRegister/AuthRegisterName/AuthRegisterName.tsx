import React, { FormEvent, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import useKeyPress from '../../../../hooks/useKeyPress'
import { useModal } from '../../../../hooks/useModal'
import { openModal } from '../../../../store/slices/FormSlice/FormSlice'
import { addFormData } from '../../../../store/slices/RegisterSlice'
import { RootState } from '../../../../store/store'
import UserLocation from '../../../Navbar/UserLocation/UserLocation'
import Button from '../../../ui/Button/Button'
import OnlyTextField from '../../../ui/OnlyTextField/OnlyTextField'
import RadioButton from '../../../ui/RadioButton/RadioButton'
import ErrorSignature from '../../ui/ErrorSignature'
import styles from './AuthRegisterName.module.scss'

const AuthRegisterName: React.FC = () => {
    const { handleOpen, handleClose, isOpen } = useModal()
    const { city } = useSelector((state: RootState) => state.currentCity)
    const dispatch = useDispatch()
    const { formData } = useSelector((state: RootState) => state.register)

    const ref = useRef<HTMLButtonElement>(null)
    useKeyPress('Enter', () => ref.current?.click())

    const [error, setError] = useState(false)
    const [status, setStatus] = useState('natural-person')
    const [fullName, setFullName] = useState({
        name: '',
        surname: '',
        middlename: ''
    })

    const handleChangeCity = (city: string) => {
        dispatch(addFormData({
            ...formData,
            city
        }))
        console.log(formData.city)
    }

    const handleChangeFullName = (e: React.ChangeEvent<HTMLInputElement>) => {
        const russianLettersRegex = /^[а-яё]+$/i
        /* ВАЛИДАЦИЯ СТРОЧКИ */
        if (e.target.value === "" || russianLettersRegex.test(e.target.value)) {
            setFullName(prevState => ({
                ...prevState,
                [e.target.name]: e.target.value
            }))
        }
    }
    useEffect(() => {
        if (fullName.name.length < 1 && fullName.name.length !== 0 || fullName.surname.length < 1 && fullName.surname.length !== 0)
            return setError(true)
        else return () => {
            setError(false)
        }
    }, [fullName])

    const handleContinue = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (error) return

        if (fullName.surname.length !== 0 && fullName.name.length !== 0) {
            dispatch(openModal('registerDataModal'))
            dispatch(addFormData({
                ...formData,
                name: fullName.name,
                surname: fullName.surname,
                middleName: fullName.middlename,
                individual: status === 'individual' ? 'Индивидуальный предприниматель' : '',
                selfEmployed: status === 'self-employment' ? 'Самозанятый' : '',
                naturalPerson: status === 'natural-person' ? 'Физическое лицо' : '',
            }))
        }
    }

    return (
        <>
            <form onSubmit={handleContinue} className={styles.container}>
                <OnlyTextField onChange={handleChangeFullName} value={fullName.surname} name='surname' placeholder='*Фамилия' />
                <OnlyTextField onChange={handleChangeFullName} value={fullName.name} name='name' placeholder='*Имя' />
                <OnlyTextField onChange={handleChangeFullName} value={fullName.middlename} name='middlename' placeholder='Отчество' />
                {error && <ErrorSignature style={{
                    marginTop: '10px',
                    display: 'flex',
                    justifyContent: 'center'
                }}>Введите ФИО корректно</ErrorSignature>}
                <RadioButton label='Физическое лицо' onClick={() => setStatus('natural-person')} checked={status === 'natural-person'} />
                <RadioButton label='Самозанятый' onClick={() => setStatus('self-employment')} checked={status === 'self-employment'} />
                <RadioButton label='Индивидуальный предприниматель' onClick={() => setStatus('individual')} checked={status === 'individual'} />
                <div className={styles.location}>
                    <span className={styles['location__text']}>{city || 'Москва'}</span>
                    <Button type='button' onClick={handleOpen}>Изменить</Button>
                </div>
                <Button ref={ref} style={{ display: 'flex', justifyContent: 'center' }} >Продолжить</Button>
            </form>
            {isOpen && <UserLocation changeCity={handleChangeCity} handleCloseMap={handleClose} />}
        </>
    )
}

export default AuthRegisterName

/*
<div className={styles.container_radioInput}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 10fr', whiteSpace: 'nowrap' }} >
                    <input checked={status.naturalPerson} onClick={() => setStatus({ selfEmployed: false, individual: false, naturalPerson: !status.naturalPerson })} type="radio" />
                    <label style={{ paddingLeft: '15px' }} htmlFor="firstName">Физическое лицо</label>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 10fr' }} >
                    <input checked={status.selfEmployed} onClick={() => setStatus({ selfEmployed: !status.selfEmployed, individual: false, naturalPerson: false })} type="radio" />
                    <label style={{ paddingLeft: '15px' }} htmlFor="name">Самозанятый</label>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 10fr', whiteSpace: 'nowrap' }}>
                    <input checked={status.individual} onClick={() => setStatus({ selfEmployed: false, individual: !status.individual, naturalPerson: false })} type="radio" />
                    <label style={{ paddingLeft: '15px' }} htmlFor="surname">Индивидуальный предприниматель</label>
                </div>
            </div>
*/