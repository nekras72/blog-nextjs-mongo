import Link from 'next/link';
import styles from './card.module.css';
import Image from 'next/image';
import { Post } from '@/types';
import { getPrettyDate } from '@/helpers';

interface ICard {
    postData: Post
}

const Card: React.FC<ICard> = ({ postData }) => {
    return (
        <div className={styles.container}>
            {postData.img && <div className={styles.imageContainer}>
                <Image className={styles.image} src={postData.img} alt="p1" fill />
            </div>}
            <div className={styles.textContainer}>
                <div className={styles.detail}>
                    <span className={styles.date}>{getPrettyDate(postData.createdAt)} - </span>
                    <span className={styles.category}>{postData.catSlug.toUpperCase()}</span>
                </div>
                <Link href={`/posts/${postData.slug}`}>
                    <h1>{postData.title}</h1>
                </Link>
                <p className={styles.description}>{postData.desc.substring(0, 60)}
                </p>
                <Link className={styles.link} href={`/posts/${postData.slug}`}>Read more</Link>
            </div>
        </div>
    )
};

export default Card;
