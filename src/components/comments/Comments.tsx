"use client"
import { useSession } from 'next-auth/react';
import styles from './comments.module.css';
import Link from 'next/link';
import Image from 'next/image';
import useSWR from 'swr';
import { Comment } from '@/types';
import { getPrettyDate } from '@/helpers';
import { useState } from 'react';

const fetcher = async (url: string) => {
    const res = await fetch(url);
    const data = await res.json();
    if (!res.ok) {
        throw new Error(data.message);
    };
    return data;
};

interface IComments {
    postSlug: string
}

const Comments: React.FC<IComments> = ({ postSlug }) => {
    const { status } = useSession();

    const { data: comments, mutate, isLoading } = useSWR(`http://localhost:3000/api/comments?postSlug=${postSlug}`, fetcher);

    const [desc, setDesc] = useState<string>('');

    const handleSubmit = async () => {
        await fetch('/api/comments', {
            method: 'POST',
            body: JSON.stringify({ desc, postSlug })
        });
        mutate();
    }

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Comments</h1>
            {status === 'authenticated' ?
                (<div className={styles.writePostContainer}>
                    <textarea placeholder='Write a comment...' className={styles.input} value={desc} onChange={(e) => setDesc(e.target.value)} />
                    <button className={styles.button} onClick={handleSubmit}>Post</button>
                </div>) :
                (<Link href="/login">Login to write a comment</Link>)}
            <div className={styles.comments}>
                {isLoading ? <div className={styles.loader} /> : comments?.map((item: Comment) => (
                    <div key={item._id} className={styles.comment}>
                        <div className={styles.user}>
                            {item.user.image && <Image
                                src={item.user.image}
                                alt=''
                                width={50}
                                height={50}
                                className={styles.image}
                            />}
                            <div className={styles.userInfo}>
                                <span className={styles.username}>{item.user.name}</span>
                                <span className={styles.date}>{getPrettyDate(item.createdAt)}</span>
                            </div>
                            <p className={styles.desc}>
                                {item.desc}
                            </p>
                        </div>
                    </div>
                ))}

            </div>
        </div>
    )
};

export default Comments;
