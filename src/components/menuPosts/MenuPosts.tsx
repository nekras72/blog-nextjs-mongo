import Link from "next/link";
import Image from "next/image";
import styles from './menuPosts.module.css';
import { Post } from "@/types";
import { getPrettyDate } from "@/helpers";

const getPopularPosts = async () => {
    const res = await fetch(`http://localhost:3000/api/posts?popular=true`, {
        cache: 'no-cache'
    });

    if (!res.ok) {
        throw new Error('failed to get Popular Posts');
    }

    return res.json();
}

const getEditorPickPosts = async () => {
    const res = await fetch(`http://localhost:3000/api/posts?editorPick=true`, {
        cache: 'no-cache'
    });

    if (!res.ok) {
        throw new Error('failed to get Editors Pick Posts');
    }

    return res.json();
}

interface IMenuPosts {
    withImage?: boolean;
}

const MenuPosts: React.FC<IMenuPosts> = async ({ withImage }) => {
    const data = !withImage ? await getPopularPosts() : await getEditorPickPosts();
    const posts: Post[] | null = data ? (!withImage ? data.popularPosts : data.editorPickPosts) : null;

    return (
        <div className={styles.items}>
            {data && posts && (
                posts.map((post: Post) => (
                    <Link key={post._id} className={styles.item} href={`/posts/${post.slug}`}>
                        {withImage && post.img &&
                            <div className={styles.imageContainer}>
                                <Image className={styles.image} src={post.img} alt="" fill />
                            </div>}
                        <div className={styles.textContainer}>
                            <span style={{ backgroundColor: post.cat.color }} className={styles.category}>{post.catSlug}</span>
                            <h3 className={styles.postTitle}>{post.title}</h3>
                            <div className={styles.detail}>
                                <span className={styles.username}>{post.user.name}</span>
                                <span className={styles.date}> - {getPrettyDate(post.createdAt)}</span>
                            </div>
                        </div>
                    </Link>
                ))
            )}
        </div >
    )
};

export default MenuPosts
