import { useState } from 'react';
import styles from '@/shared/css/Home/Navbar.module.css'
import { AiFillSetting, AiFillQuestionCircle } from "react-icons/ai";
import { MdOutlineLogout } from "react-icons/md";

export default function Navbar() {
    const [dropdownVisible, setDropdownVisible] = useState<boolean>(false);

    const toggleDropdown = () => setDropdownVisible(!dropdownVisible);

    var studentNumber = 2201;
    var name = "공덕현"; // 이거 어디서 받아와야 될지 생각해보기
    var myImage = "/sample.jpg"

    return (
        <div className={styles.navbar}>
            <div className={styles.container}>
                <a href="/" className={styles.brand}><img src="/clue.svg" alt="My Image" className={styles.image} /></a>
                <nav className={styles.navbarNav}>
                    <ul className={styles.navLinks}>
                        <li><a href="#action1" className={styles.navItem}>학습실로 가기</a></li>
                        <li><a href="#action2" className={styles.navItem}>학습실 추가</a></li>
                        <li><a href="#action3" className={styles.navItem}>수강신청</a></li>
                        <li><a href="#action4" className={styles.navItem}>서비스 소개</a></li>
                    </ul>
                    <div className={styles.dropdownContainer}>
                        <button onClick={toggleDropdown} className={styles.dropdownButton}>
                            <img src={myImage} alt="프로필" />
                        </button>
                        {dropdownVisible && (
                            <div className={styles.dropdownMenu}>
                                <div style={{display:'flex', verticalAlign:'middle', alignItems:'center'}}>
                                    <div className={styles.myImage}>
                                        <img src={myImage} alt="프로필"></img>
                                    </div>
                                    <div>
                                        <div>
                                            <p className={styles.name}>{name}님</p>
                                            <p className={styles.studentNumber}>부산소프트웨어마이스터고 {studentNumber}</p>
                                        </div>
                                    </div>
                                </div>
                                <a href="#action3" className={styles.dropdownItem}><AiFillSetting className={styles.verticalAlign}/>&nbsp; &nbsp;설정</a>
                                <a href="#action4" className={styles.dropdownItem}><AiFillQuestionCircle className={styles.verticalAlign}/>&nbsp; &nbsp;문의하기</a>
                                <a href="#action5" className={styles.logout}><MdOutlineLogout className={styles.verticalAlign}/>&nbsp; &nbsp;로그아웃</a>
                            </div>
                        )}
                    </div>
                </nav>
            </div>
        </div>
    );
}