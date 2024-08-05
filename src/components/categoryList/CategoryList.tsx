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
                        <Link style={{ backgroundColor: item.color }} className={styles.category} href={`/blog?cat=${item.slug}`} key={item.id}>
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
            </div>
        </div>
    )
};

export default CategoryList;
