import Link from "next/link";
import styles from './menuCategories.module.css';
import { Category } from "@/types";

const getCategories = async () => {
  const res = await fetch('http://localhost:3000/api/categories', {
    cache: 'reload',
    method: 'GET',
  });

  if (!res.ok) {
    throw new Error('failed to get Categories at MenuCategories');
  }

  return res.json();
};

const MenuCategories = async () => {
  const categories: Category[] | undefined = await getCategories();

  return (
    <div className={styles.categoryList}>
      {categories && categories.map((cat) => (
        <Link key={cat.id} href={`/blog?cat=${cat.slug}`} style={{ backgroundColor: cat.color }} className={styles.categoryItem}>{cat.title}</Link>
      ))}
    </div>
  )
};

export default MenuCategories
