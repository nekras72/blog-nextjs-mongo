'use client'
import React from "react";
import styles from './pagination.module.css';
import { useRouter } from "next/navigation";

interface IPagination {
    page: number,
    hasNext: boolean,
}

const Pagination: React.FC<IPagination> = ({ page, hasNext }) => {
    const router = useRouter();
    const handleChangePage = (p: 'increment' | 'decrement') => {
        switch (p) {
            case 'increment':
                router.push(`?page=${page + 1}`)
                break;
            case 'decrement':
                if (page > 1) router.push(`?page=${page - 1}`);
                break;
            default:
                break;
        }
    }
    return (
        <div className={styles.container}>
            <button className={styles.button} onClick={() => handleChangePage('decrement')} disabled={page === 1}>Previous</button>
            <button className={styles.button} onClick={() => handleChangePage('increment')} disabled={!hasNext}>Next</button>
        </div>
    )
};

export default Pagination;
