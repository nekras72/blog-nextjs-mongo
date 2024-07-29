import CardList from '@/components/cardList/CardList';
import styles from './blogPage.module.css';
import Menu from '@/components/menu/Menu';
import { SearchParams } from '@/types';

interface IBlogPage {
    searchParams: SearchParams
};

const BlogPage: React.FC<IBlogPage> = ({ searchParams }) => {
    const page = searchParams.page || 1;
    const { cat } = searchParams;

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>{cat} blog</h1>
            <div className={styles.content}>
                <CardList page={page} cat={cat} />
                <Menu />
            </div>
        </div>
    )
};

export default BlogPage;
