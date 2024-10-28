import React from 'react';
import img1_svg from '../../../../../../assets/images/newCategories/geo1.svg';
import img2_svg from '../../../../../../assets/images/newCategories/geo2.svg';
import img3_svg from '../../../../../../assets/images/newCategories/geo3.svg';
import Button from '../../../../../ui/Button/Button';
import styles from '../../CategoryCardDetail.module.scss';
import { buttonPosition2, styleButtonBlue, styleButtonDark } from '../../styles/stylesCategoryCard';

const GeoCardRight: React.FC<{ currentType: string }> = ({ currentType }) => {
    let imgSrc;

    switch (currentType) {
        case 'Геология Геодезия':
            imgSrc = img1_svg;
            break;
        case 'Бурение скважин на воду':
            imgSrc = img2_svg;
            break;
        case 'Кадастровые услуги':
            imgSrc = img3_svg;
            break;
        default:
            imgSrc = undefined;
    }

    return (
        <div className={styles['cardDetail_mainContent_rightSide']}>
            {imgSrc && <img src={imgSrc} alt="right_svg" />}
            <div style={buttonPosition2}>
                <Button style={styleButtonBlue}>Просмотр заказов</Button>
                <Button style={styleButtonDark}>Регистрация исполнителя</Button>
            </div>
            <span className={styles['text']}>
                Создавайте заказы на стройматериалы, укажите количество и тип, контакты для поставщиков. Заказ будет доступен для просмотра всем зарегистрированным поставщикам, которые смогут предложить свои услуги и цены. Выберите лучшего и заключите сделку.
            </span>
        </div>
    );
}

export default GeoCardRight;