import Menu from '@/components/menu/Menu';
import styles from './singlePostPage.module.css';
import Image from 'next/image';
import Comments from '@/components/comments/Comments';

const SinglePostPage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.infoContainer}>
        <div className={styles.textContainer}>
          <h1 className={styles.title}>Lorem, ipsum dolor sit amet consectetur adipisicing elit.</h1>
          <div className={styles.user}>
            <div className={styles.userImageContainer}>
              <Image className={styles.avatar} src='/p1.jpeg' alt='p1' fill />
            </div>
            <div className={styles.userTextContainer}>
              <span className={styles.username}>John Doe</span>
              <span className={styles.date}>01.05.2024</span>
            </div>
          </div>
        </div>
        <div className={styles.imageContainer}>
          <Image className={styles.image} src='/p1.jpeg' alt='p1' fill />
        </div>
      </div>
      <div className={styles.content}>
        <div className={styles.post}>
          <div className={styles.description}>
            <p className={styles.postText}>
              1postText postText postText Lorem ipsum, dolor sit amet consectetur adipisicing elit. Porro perspiciatis neque vel
              ipsum! Nemo eaque totam, quia ipsam accusantium minus reprehenderit reiciendis molestias
              laboriosam voluptatum adipisci mollitia enim, temporibus deserunt.
            </p>
            <h2>Nemo eaque totam, quia ipsam accusantium minus</h2>
            <p className={styles.postText}>
              1postText postText postText Lorem ipsum, dolor sit amet consectetur adipisicing elit. Porro perspiciatis neque vel
              ipsum! Nemo eaque totam, quia ipsam accusantium minus reprehenderit reiciendis molestias
              laboriosam voluptatum adipisci mollitia enim, temporibus deserunt.
            </p>
          </div>
          <div className={styles.comments}>
            <Comments />
          </div>
        </div>
        <Menu />
      </div>
    </div >
  )
};

export default SinglePostPage;
