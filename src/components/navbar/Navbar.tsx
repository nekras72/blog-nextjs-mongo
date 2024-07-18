import React from 'react';
import styles from './navbar.module.css';
import Image from 'next/image';
import Link from 'next/link';
import ThemeToggler from '../themeToggler/ThemeToggler';
import AuthLinks from '../authLinks/AuthLinks';

const Navbar: React.FC = () => {
    return (
        <div className={styles.container}>
            <div className={styles.social}>
                <Image src="/facebook.png" alt="facebook" width={24} height={24} />
                <Image src="/instagram.png" alt="instagram" width={24} height={24} />
                <Image src="/linkedin.png" alt="linkedin" width={24} height={24} />
                <Image src="/github.png" alt="github" width={24} height={24} />
            </div>
            <div className={styles.logo}>Olim Dev Blog</div>
            <div className={styles.links}>
                <ThemeToggler />
                <Link className={styles.link} href="/">Homepage</Link>
                <Link className={styles.link} href="/">Contact</Link>
                <Link className={styles.link} href="/">About</Link>
                <AuthLinks />
            </div>
        </div>
    )
};

export default Navbar
