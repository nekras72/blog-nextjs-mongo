import Menu from '@/components/menu/Menu';
import styles from './singlePostPage.module.css';
import Image from 'next/image';
import Comments from '@/components/comments/Comments';
import { Post } from '@/types';
import { getPrettyDate } from '@/helpers';
import DeletePostButton from '@/components/deletePostButton/DeletePostButton';

const getData = async (slug: string) => {
  const res = await fetch(`http://localhost:3000/api/posts/${slug}`, {
    cache: 'no-cache'
  });

  if (!res.ok) {
    console.log(new Error('failed to get post data'));
  }

  return res.json();
}

interface ISinglePostPage {
  params: {
    slug: string
  }
}

const SinglePostPage: React.FC<ISinglePostPage> = async ({ params }) => {
  const { slug } = params;
  const postData: Post = await getData(slug);
  const hasProperData = Object.hasOwn(postData, 'title') &&
    Object.hasOwn(postData, 'user') &&
    Object.hasOwn(postData, 'createdAt') &&
    Object.hasOwn(postData, 'desc');

  return !hasProperData ? (<p>Post does not exist or you should check your internet</p>) : (
    <div className={styles.container}>
      <div className={styles.infoContainer}>
        <div className={styles.textContainer}>
          <h1 className={styles.title}>{postData?.title}</h1>
          <div className={styles.user}>
            {postData?.user?.image && <div className={styles.userImageContainer}>
              <Image className={styles.avatar} src={postData.user.image} alt='' fill />
            </div>}
            <div className={styles.userTextContainer}>
              <span className={styles.username}>{postData?.user?.name}</span>
              <span className={styles.date}>{getPrettyDate(postData.createdAt)}</span>
            </div>
          </div>
        </div>
        {postData?.img && <div className={styles.imageContainer}>
          <Image className={styles.image} src={postData.img} alt='' fill />
        </div>}
      </div>
      <div className={styles.content}>
        <div className={styles.post}>
          {postData?.desc && <div
            className={styles.description}
            dangerouslySetInnerHTML={{ __html: postData.desc }} />}
          <DeletePostButton slug={slug} />
          <div className={styles.comments}>
            <Comments postSlug={slug} />
          </div>
        </div>
        <Menu />
      </div>
    </div >
  )
};

export default SinglePostPage;
