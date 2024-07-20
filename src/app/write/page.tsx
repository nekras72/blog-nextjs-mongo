import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import styles from './writePage.module.css';

const WritePage = () => {
    const { data, status } = useSession();
    console.log(data);

    const router = useRouter();
    if (status === 'loading') {
        return <div className={styles.loading}>Loading...</div>
    }

    useEffect(() => {
        if (status === 'authenticated') {
            router.push('/');
        }
    }, [status])
  return (
    <div>
      
    </div>
  )
};

export default WritePage;
