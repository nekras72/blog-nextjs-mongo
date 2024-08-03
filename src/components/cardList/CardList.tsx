import React from "react";
import styles from './cardList.module.css';
import Pagination from "../pagination/Pagination";
import Card from "../card/Card";
import { Post, SearchParams } from "@/types";
import { POSTS_PER_PAGE } from "@/constants";

const getData = async ({ page, cat }: SearchParams) => {
    const res = await fetch(`http://localhost:3000/api/posts?page=${page}&cat=${cat || ''}`, {
        cache: 'reload'
    });

    if (!res.ok) {
        throw new Error('failed to get posts');
    }

    return res.json();
}

const CardList: React.FC<SearchParams> = async ({ page, cat }) => {

    const { posts, count } = await getData({ page, cat });
    const hasNext = page * POSTS_PER_PAGE < count;

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Recent posts</h1>
            <div className={styles.posts}>
                {posts?.map((item: Post) => {
                    return <Card postData={item} key={item._id} />
                })}
            </div>
            <Pagination hasNext={hasNext} page={page} />
        </div>
    )
};

export default CardList;
