
import React from 'react'
import address_icon from '../../../../assets/images/other/calendar-03.png'
import { formatDate } from '../../../../common/common'
import { IOrderFullInfo } from '../../../../services/order/types/types'
import styles from './BuildingSpecificFields.module.scss'

const TruckingSpecificFields: React.FC<{ card: IOrderFullInfo }> = ({ card }) => {
    let length, width, height, volume

    // Проверяем, является ли подкатегория 'Грузоперевозки'
    if (card.sub_category.name === 'Грузоперевозки' && card.params_cargo) {
        const dimensions = card.params_cargo!.split('&')

        height = dimensions[0]
        length = dimensions[1]
        width = dimensions[2]
        volume = dimensions[3]
    }

    return (
        <div className={styles['truckingfields']}>
            <div className={styles['flexRow']}>
                <span>Адрес:</span>
                <span style={{ fontWeight: 800 }}>{card.address}</span>
                <img src={address_icon} alt="address" />
            </div>
            <div style={{ display: 'flex', gap: 18, alignItems: 'center', flexWrap: 'wrap' }}>
                {card.sub_category.name === 'Грузоперевозки' && (
                    <>
                        <div className={styles['flexRow']}>
                            <span>По городу или межгород</span>
                            <span style={{ fontWeight: 800 }}>
                                {card.transportation === 'CITY' && 'По городу'}
                                {card.transportation === 'INTERCITY' && 'Межгород'}
                            </span>
                        </div>
                        <span>Параметры груза:</span>
                        <div className={styles['flexRow']}>
                            {card.params_cargo && (
                                <>
                                    <div className={styles['flexRow']}>
                                        <span>Длина:</span>
                                        <span style={{ fontWeight: 800 }}>{length}м</span>
                                    </div>
                                    <div className={styles['flexRow']}>
                                        <span>Ширина:</span>
                                        <span style={{ fontWeight: 800 }}>{width}м</span>
                                    </div>
                                    <div className={styles['flexRow']}>
                                        <span>Высота:</span>
                                        <span style={{ fontWeight: 800 }}>{height}м</span>
                                    </div>
                                    <div className={styles['flexRow']}>
                                        <span>Объем:</span>
                                        <span style={{ fontWeight: 800 }}>{volume}м²</span>
                                    </div>
                                </>
                            )}
                        </div>
                    </>
                )}
                {card.sub_category.name === 'Спецтехника' && (
                    <div className={styles['flexRow']}>
                        <span>Время работы:</span>
                        <span style={{ fontWeight: 700 }}>{card.info_time_rent ? `${card.info_time_rent} ч` : 'На усмотрение специалиста'}</span>
                    </div>
                )}
                <div className={styles['flexRow']}>
                    <span>Когда нужна услуга:</span>
                    <span style={{ fontWeight: 800 }}> {card.start_date && card.end_date
                        ? `${formatDate(card.start_date as string)} - ${formatDate(card.end_date as string)}`
                        : '-'}</span>
                </div>
                <div className={styles['flexRow']}>
                    <span>Способ оплаты:</span>

                </div>
                <div className={styles['flexRow']}>
                    <span>Контактный телефон:</span>
                    <span style={{ fontWeight: 800 }}>{card.contact_phone}</span>
                </div>
                <div className={styles['flexRow']}>
                    <span>Работа по договору:</span>
                    <span style={{ fontWeight: 800 }}>{card.is_contract ? 'Да' : 'Нет'}</span>
                </div>
            </div>
        </div>
    )
}

export default TruckingSpecificFields