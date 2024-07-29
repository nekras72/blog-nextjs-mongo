import React from "react";
import styles from './categoryList.module.css';
import Link from "next/link";
import Image from "next/image";
import { fetchData } from "next-auth/client/_utils";

const getData = async () => {
    // const res = await fetchData()
}

const CategoryList: React.FC = () => {
    return (
        <div>
            <h1 className={styles.title}>Popular Categories</h1>
            <div className={styles.categories}>
                <Link className={`${styles.category} ${styles.style}`} href="/blog?cat=style">
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
                </Link>
            </div>
        </div>
    )
};

export default CategoryList;
