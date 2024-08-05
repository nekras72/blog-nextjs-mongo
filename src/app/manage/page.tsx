"use client"
import styles from './manage.module.css';
import { redirect } from 'next/navigation';

import useUser from '@/hooks/useUser';
import Loader from '@/components/loader/Loader';
import ManageCategories from '@/components/manage/manageCategories/ManageCategories';

const ManageAppPage = () => {
    const { isAdmin, isLoading } = useUser();

    if (!isAdmin && !isLoading) {
        redirect('/');
    }

    return (
        <div className={styles.container}>
            {isLoading ? <Loader /> : <ManageCategories />}

            categories manage(show list): add, rename, change picture, delete

            posts manage(add search bar by title, by cat): write, change(title, picture, desc), delete
        </div>
    )
};

export default ManageAppPage;
