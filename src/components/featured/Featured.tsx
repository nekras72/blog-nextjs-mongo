import React from "react";
import styles from './featured.module.css';
import Image from "next/image";

const Featured: React.FC = () => {
    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Hey, wanna know more about live of olim devs familiy?</h1>
            <div className={styles.post}>
                <div className={styles.imageContainer}>
                    <Image className={styles.image} src="/p1.jpeg" alt="p1" fill />
                </div>
                <div className={styles.textContainer}>
                    <h1 className={styles.postTitle}>Lets start...</h1>
                    <p className={styles.postDescription}>Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Laboriosam quos dolores sed modi nostrum vero, laudantium dicta dolorem reprehenderit alias.
                        Vitae consequuntur dolorem fugiat, in doloribus officiis corporis consectetur sequi.</p>
                    <button className={styles.postButton}>Read more</button>
                </div>
            </div>
        </div>
    )
};

export default Featured;
