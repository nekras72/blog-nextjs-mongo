import Link from 'next/link';
import styles from './card.module.css';
import Image from 'next/image';

const Card = () => {
    return (
        <div className={styles.container}>
            <div className={styles.imageContainer}>
                <Image className={styles.image} src="/p1.jpeg" alt="p1" fill />
            </div>
            <div className={styles.textContainer}>
                <div className={styles.detail}>
                    <span className={styles.date}>11.02.2024 - </span>
                    <span className={styles.category}>Culture</span>
                </div>
                <Link href="/">
                    <h1>Lorem ipsum dolor sit amet consectetur adipisicing elit.</h1>
                </Link>
                <p className={styles.description}>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Itaque
                    sed rem dolores suscipit? Repellat, neque, iure minima cumque dolor
                    amet beatae ea aliquam magni atque vitae? Hic expedita neque
                    deleniti.
                </p>
                <Link className={styles.link} href="/">Read more</Link>
            </div>
        </div>
    )
};

export default Card;
