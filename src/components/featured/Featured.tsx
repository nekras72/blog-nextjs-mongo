import React from "react";
import styles from './featured.module.css';
import Image from "next/image";
import { Post } from "@/types";
import Link from "next/link";

const getFeaturedPost = async () => {
    const res = await fetch(`http://localhost:3000/api/posts?featured=true`, {
        cache: 'no-cache'
    });

    if (!res.ok) {
        throw new Error('failed to get Popular Posts');
    }

    return res.json();
}

const Featured: React.FC = async () => {
    const data = await getFeaturedPost();
    const featuredPosts = data?.featuredPosts ?? null;
    const mostViewedPost: Post | null = featuredPosts?.[0] ?? null;

    return mostViewedPost ? (
        <div className={styles.container}>
            <h1 className={styles.title}>Hey, wanna know more about live of olim devs familiy?</h1>
            <div className={styles.post}>
                {mostViewedPost.img && <div className={styles.imageContainer}>
                    <Image className={styles.image} src={mostViewedPost.img} alt="" fill />
                </div>}
                <div className={styles.textContainer}>
                    <h1 className={styles.postTitle}>{mostViewedPost.title}</h1>
                    <p className={styles.postDescription}>{mostViewedPost.desc.substring(0, 200)}</p>
                    <Link href={`/posts/${mostViewedPost.slug}`} className={styles.postButton}>Read more</Link>
                </div>
            </div>
        </div>
    ) : (<p>Something went wrong</p>)
};

export default Featured;
