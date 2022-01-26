import React from "react";
import Script1 from "./Script1";
import '../styles/Sidebar.module.css';
import styles from '../styles/Sidebar.module.css'
import 'boxicons';
// import styles from '../styles/Card.module.css'

const Sidebarnew = () => {

    // let arrow = document.querySelectorAll(".arrow");
    // for (var i = 0; i < arrow.length; i++) {
    //     arrow[i].addEventListener("click", (e) => {
    //         let arrowParent = e.target.parentElement.parentElement;//selecting main parent of arrow
    //         arrowParent.classList.toggle("showMenu");
    //     });
    // }

    // let sidebar = document.querySelector(".sidebar");
    // let sidebarBtn = document.querySelector(".bx-menu");
    // console.log(sidebarBtn);
    // sidebarBtn.addEventListener("click", () => {
    //     sidebar.classList.toggle("close");
    // }); 

    return (
        <>        
            <div className={`${styles.sidebar} ${styles.close}`}>
                <div className={styles["logo-details"]}>
                    <i className={`${styles.bx} ${styles["bxl-c-plus-plus"]}`}></i>
                    <span className={styles["logo_name"]}>CodingLab</span>
                </div>
                <ul className={styles["nav-links"]}>
                    <li>
                        <a href="#">
                            <i className={`${styles.bx} ${styles["bx-grid-alt"]}`}></i>
                            <span className={styles["link_name"]}>Dashboard</span>
                        </a>
                        <ul className={`${styles.blank} ${styles["sub-menu"]}`}>
                            <li><a className={styles["link_name"]} href="#">Category</a></li>
                        </ul>
                    </li>
                    <li>
                        <div className={styles["iocn-link"]}>
                            <a href="#">
                                <i className={`${styles.bx} ${styles["bx-collection"]}`}></i>
                                <span className={styles["link_name"]}>Category</span>
                            </a>
                            <i className={`${styles.bx} ${styles["bxs-chevron-down"]} ${styles.arrow}`}></i>
                        </div>
                        <ul className={`${styles["sub-menu"]}`}>
                            <li><a className={styles["link_name"]} href="#">Category</a></li>
                            <li><a href="#">HTML and CSS</a></li>
                            <li><a href="#">JavaScript</a></li>
                            <li><a href="#">PHP and MySQL</a></li>
                        </ul>
                    </li>
                    <li>
                        <div className={styles["iocn-link"]}>
                            <a href="#">
                                <i className={`${styles.bx} ${styles["bx-book-alt"]}`}></i>
                                <span className={styles["link_name"]}>Posts</span>
                            </a>
                            {/* 'bx bxs-chevron-down arrow' */}
                            <i className={`${styles.bx} ${styles["bxs-chevron-down"]} ${styles.arrow}`}></i>
                        </div>
                        <ul className={`${styles["sub-menu"]}`}>
                            <li><a className={styles["link_name"]} href="#">Posts</a></li>
                            <li><a href="#">Web Design</a></li>
                            <li><a href="#">Login Form</a></li>
                            <li><a href="#">Card Design</a></li>
                        </ul>
                    </li>
                    <li>
                        <a href="#">
                            {/* sub-menu blank */}
                            <i className={`${styles.bx} ${styles["bx-pie-chart-alt-2"]}`}></i>
                            <span className={styles["link_name"]}>Analytics</span>
                        </a>
                        <ul className={`${styles["sub-menu"]} ${styles.blank}`}>
                            <li><a className={styles["link_name"]} href="#">Analytics</a></li>
                        </ul>
                    </li>
                    <li>
                        <a href="#">
                            {/* 'bx bx-plug' */}
                            <i className={`${styles.bx} ${styles["bx-line-chart"]}`}></i>
                            <span className={styles["link_name"]}>Chart</span>
                        </a>
                        <ul className={`${styles["sub-menu"]} ${styles.blank}`}>
                            <li><a className={styles["link_name"]} href="#">Chart</a></li>
                        </ul>
                    </li>
                    <li>
                        <div className={styles["iocn-link"]}>
                            <a href="#">
                                <i className={`${styles.bx} ${styles["bx-plug"]}`}></i>
                                <span className={styles["link_name"]}>Plugins</span>
                            </a>
                            <i className={`${styles.bx} ${styles["bxs-chevron-down"]} ${styles.arrow}`}></i>
                        </div>
                        <ul className={`${styles["sub-menu"]}`}>
                            <li><a className={styles["link_name"]} href="#">Plugins</a></li>
                            <li><a href="#">UI Face</a></li>
                            <li><a href="#">Pigments</a></li>
                            <li><a href="#">Box Icons</a></li>
                        </ul>
                    </li>
                    <li>
                        <a href="#">
                            {/* 'bx bx-history'  */}
                            <i className={`${styles.bx} ${styles["bx-compass"]}`}></i>
                            <span className={styles["link_name"]}>Explore</span>
                        </a>
                        <ul className={`${styles["sub-menu"]} ${styles.blank}`}>
                            <li><a className={styles["link_name"]} href="#">Explore</a></li>
                        </ul>
                    </li>
                    <li>
                        <a href="#">
                            <i className={`${styles.bx} ${styles["bx-history"]}`}></i>
                            <span className={styles["link_name"]}>History</span>
                        </a>
                        <ul className={`${styles["sub-menu"]} ${styles.blank}`}>
                            <li><a className={styles["link_name"]} href="#">History</a></li>
                        </ul>
                    </li>
                    <li>
                        <a href="#">
                            {/* bx bx-log-out */}
                            <i className={`${styles.bx} ${styles["bx-cog"]}`}></i>
                            <span className={styles["link_name"]}>Setting</span>
                        </a>
                        <ul className={`${styles["sub-menu"]} ${styles.blank}`}>
                            <li><a className={styles["link_name"]} href="#">Setting</a></li>
                        </ul>
                    </li>
                    <li>
                        {/* bx bx-menu */}
                        <div className={styles["profile-details"]}>
                            <div className={styles["profile-content"]}>
                                <img src="image/profile.jpg" alt="profileImg" />
                            </div>
                            <div className={styles["name-job"]}>
                                <div className={styles["profile_name"]}>Prem Shahi</div>
                                <div className={styles.job}>Web Desginer</div>
                            </div>
                            <i className={`${styles.bx} ${styles["bx-log-out"]}`}></i>
                        </div>
                    </li>
                </ul>
            </div>
            {/* home-content */}
            <section className={styles["home-section"]}>
                <div className={styles["home-content"]}>
                    <i className={`${styles.bx} ${styles["bx-menu"]}`}></i>
                    <span className={styles.text}>Drop Down Sidebar</span>
                </div>
            </section>

            {Script1}

            {/* <script src={Script}></script> */}
        </>
    );
};


export default Sidebarnew;