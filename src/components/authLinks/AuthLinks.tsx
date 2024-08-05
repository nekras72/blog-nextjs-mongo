"use client"
import Link from 'next/link';
import styles from './authLinks.module.css';
import { useState } from 'react';
import { signOut, useSession } from 'next-auth/react';
import useUser from '@/hooks/useUser';

const AuthLinks = () => {
  const { isAdmin } = useUser();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { status } = useSession();

  const handleCloseMenu = () => {
    setIsOpen(false);
  };

  return (
    <>
      {status === 'unauthenticated' ? (
        <Link className={styles.link} href="/login">Login</Link>
      ) : (
        <>
          {isAdmin && <>
            <Link className={styles.link} href="/write">Write</Link>
            <Link onClick={handleCloseMenu} href="/manage">Manage</Link>
          </>}
          <span className={styles.link} onClick={() => signOut()} >Logout</span>
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
          <Link onClick={handleCloseMenu} href="/">Home</Link>
          <Link onClick={handleCloseMenu} href="/">About</Link>
          <Link onClick={handleCloseMenu} href="/">Contact</Link>
          {status === 'unauthenticated' ? (
            <Link href="/login" onClick={handleCloseMenu}>Login</Link>
          ) : (
            <>
              {isAdmin && <>
                <Link onClick={handleCloseMenu} href="/write">Write</Link>
                <Link onClick={handleCloseMenu} href="/manage">Manage</Link>
              </>}
              <span style={{ cursor: 'pointer' }} onClick={() => signOut()} >Logout</span>
            </>
          )}
        </div>}
    </>
  )
};

export default AuthLinks
