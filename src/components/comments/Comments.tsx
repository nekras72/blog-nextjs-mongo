"use client"
import { useSession } from 'next-auth/react';
import styles from './comments.module.css';
import Link from 'next/link';
import Image from 'next/image';

const Comments = () => {
    const { status } = useSession();
    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Comments</h1>
            {status === 'authenticated' ?
                (<div className={styles.writePostContainer}>
                    <textarea placeholder='Write a comment...' className={styles.input} />
                    <button className={styles.button}>Post</button>
                </div>) :
                (<Link href="/login">Login to write a comment</Link>)}
            <div className={styles.comments}>
                <div className={styles.comment}>
                    <div className={styles.user}>
                        <Image
                            src="/p1.jpeg"
                            alt='p1'
                            width={50}
                            height={50}
                            className={styles.image}
                        />
                        <div className={styles.userInfo}>
                            <span className={styles.username}>John Does</span>
                            <span className={styles.date}>01.05.2024</span>
                        </div>
                        <p className={styles.desc}>
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iusto mollitia porro
                            velit odit sint magni fugiat enim deserunt obcaecati, tenetur accusantium architecto
                            aspernatur eaque labore iure sequi recusandae ducimus sunt!
                        </p>
                    </div>
                </div>
                <div className={styles.comment}>
                    <div className={styles.user}>
                        <Image
                            src="/p1.jpeg"
                            alt='p1'
                            width={50}
                            height={50}
                            className={styles.image}
                        />
                        <div className={styles.userInfo}>
                            <span className={styles.username}>John Does</span>
                            <span className={styles.date}>01.05.2024</span>
                        </div>
                        <p className={styles.desc}>
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iusto mollitia porro
                            velit odit sint magni fugiat enim deserunt obcaecati, tenetur accusantium architecto
                            aspernatur eaque labore iure sequi recusandae ducimus sunt!
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Comments;
