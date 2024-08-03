'use client'
import { useSession } from "next-auth/react";
import styles from './deletePostButton.module.css';

const deletePost = async (slug: string) => {
    const response = await fetch(`http://localhost:3000/api/posts/${slug}`, {
        method: 'DELETE',
        body: JSON.stringify(slug)
    });
    if (!response.ok) {
        throw new Error('failed to delete post');
    }
    return response.json();
};

interface IDeletePostButton {
    slug: string
}
function DeletePostButton({ slug }: IDeletePostButton) {

    const { status } = useSession();
    const isAuthenticated = status === "authenticated";

    if (!isAuthenticated) return null;

    return (
        <div className={styles.buttonContainer}>
            <button onClick={() => deletePost(slug)} className={styles.button}>
                Delete Post
            </button>
        </div>
    )
}

export default DeletePostButton

