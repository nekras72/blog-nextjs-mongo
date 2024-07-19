"use client"
import { signIn, useSession } from 'next-auth/react';
import styles from './loginPage.module.css';

const LoginPage = () => {
    const {data, status} = useSession();
    return (
        <div className={styles.container}>
            <div className={styles.wrapper}>
                <div
                className={`${styles.socialButton}
                ${styles.google}`}
                onClick={() => signIn('google')}
                >Sign in with Google</div>
                <div className={`${styles.socialButton} ${styles.github}`}>Sign in with Github</div>
                <div className={`${styles.socialButton} ${styles.facebook}`}>Sign in with Facebook</div>
            </div>
        </div>
    )
};

export default LoginPage;