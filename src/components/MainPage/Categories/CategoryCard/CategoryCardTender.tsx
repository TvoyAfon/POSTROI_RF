import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import nitka2 from '../../../../assets/images/mainpage_images/newCategories/_Р»РѕР№_1.svg';
import stolbs2 from '../../../../assets/images/mainpage_images/newCategories/Group 116.svg';
import nitka from '../../../../assets/images/mainpage_images/newCategories/nitka_white.svg';
import stolb from '../../../../assets/images/mainpage_images/newCategories/stolb.svg';
import stolbs from '../../../../assets/images/mainpage_images/newCategories/stolbs_white.svg';
import { ICategoryCard } from '../../../../interface/categoryCard.props';
import styles from '../../MainPage.module.scss';

const CategoryCardTender: React.FC<ICategoryCard> = ({ to }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <Link 
      className={styles['mainPage_categories_tender']} 
      to={to} 
      onMouseEnter={() => setIsHovered(true)} 
      onMouseLeave={() => setIsHovered(false)}
    >
      <div style={{ paddingTop: 5 }}>
        <span>ТЕНДЕРНАЯ <br />ПЛОЩАДКА</span>
      </div>
      <img 

        src={isHovered ? nitka2 : nitka} 
        alt="nitka" 
      />
      <img 
        src={isHovered ? stolbs2 : stolbs} 
        alt="stolbs" 
      />
      {isHovered && <img src={stolb} alt='stolb' />}
    </Link>
  );
}

export default CategoryCardTender;