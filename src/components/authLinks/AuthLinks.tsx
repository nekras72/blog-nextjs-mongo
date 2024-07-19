"use client"
import Link from 'next/link';
import styles from './authLinks.module.css';
import { useState } from 'react';

const AuthLinks = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const status = 'notauthenticated';
  return (
    <>
      {status === 'notauthenticated' ? (
        <Link className={styles.link} href="/login">Login</Link>
      ) : (
        <>
          <Link className={styles.link} href="/write">Write</Link>
          <Link className={styles.link} href="/logout">Logout</Link>
        </>
      )}
      <button
        className={styles.burger}
        onClick={() => setIsOpen(state => !state)}
      >
        <div className={styles.line}></div>
        <div className={styles.line}></div>
        <div className={styles.line}></div>
      </button>
      {isOpen &&
        <div className={styles.responsiveMenu}>
          <Link href="/">Homepage</Link>
          <Link href="/">About</Link>
          <Link href="/">Contact</Link>
          {status === 'notauthenticated' ? (
            <Link href="/login">Login</Link>
          ) : (
            <>
              <Link href="/write">Write</Link>
              <Link href="/logout">Logout</Link>
            </>
          )}
        </div>}
    </>
  )
};

export default AuthLinks
