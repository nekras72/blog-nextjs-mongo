import React from "react";
import styles from './categoryList.module.css';
import Link from "next/link";
import Image from "next/image";
import { Category } from "@/types";

const getData = async () => {
    const res = await fetch('http://localhost:3000/api/categories', {
        cache: 'reload'
    });

    if (!res.ok) {
        throw new Error('failed to get categories');
    }

    return res.json();
}

const CategoryList: React.FC = async () => {
    const data: Category[] | undefined = await getData();
    return (
        <div>
            <h1 className={styles.title}>Popular Categories</h1>
            <div className={styles.categories}>
                {data && data.map((item) => {
                    return (
                        <Link className={`${styles.category} ${styles[item.slug]}`} href={`/blog?cat=${item.slug}`} key={item._id}>
                            {item.img &&
                                <Image
                                    className={styles.image}
                                    alt=""
                                    src={item.img}
                                    width={32}
                                    height={32}
                                />}
                            {item.title}
                        </Link>
                    );
                })}
                {/* <Link className={`${styles.category} ${styles.style}`} href="/blog?cat=style">
                    <Image
                        className={styles.image}
                        alt="style"
                        src="/style.png"
                        width={32}
                        height={32}
                    />
                    Style
                </Link>
                <Link className={`${styles.category} ${styles.travel}`} href="/blog?cat=travel">
                    <Image
                        className={styles.image}
                        alt="style"
                        src="/travel.png"
                        width={32}
                        height={32}
                    />
                    Travel
                </Link>
                <Link className={`${styles.category} ${styles.culture}`} href="/blog?cat=culture">
                    <Image
                        className={styles.image}
                        alt="style"
                        src="/culture.png"
                        width={32}
                        height={32}
                    />
                    Culture
                </Link>
                <Link className={`${styles.category} ${styles.coding}`} href="/blog?cat=coding">
                    <Image
                        className={styles.image}
                        alt="style"
                        src="/coding.png"
                        width={32}
                        height={32}
                    />
                    Coding
                </Link>
                <Link className={`${styles.category} ${styles.food}`} href="/blog?cat=food">
                    <Image
                        className={styles.image}
                        alt="style"
                        src="/food.png"
                        width={32}
                        height={32}
                    />
                    Food
                </Link>
                <Link className={`${styles.category} ${styles.fashion}`} href="/blog?cat=fashion">
                    <Image
                        className={styles.image}
                        alt="style"
                        src="/fashion.png"
                        width={32}
                        height={32}
                    />
                    Fashion
                </Link> */}
            </div>
        </div>
    )
};

export default CategoryList;
