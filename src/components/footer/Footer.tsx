import React from "react";
import styles from './footer.module.css';
import Image from 'next/image';
import Link from "next/link";

const Footer: React.FC = () => {
    return (
        <div className={styles.container}>
            <div className={styles.info}>
                <div className={styles.logo}>
                    <Image src="/logo.png" alt="logo" width={50} height={50} />
                    <h1 className={styles.logoText}>Olim Dev Blog</h1>
                </div>
                <p className={styles.decs}>
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Veritatis,
                    voluptate, dolore laboriosam suscipit odio esse in possimus minus delectus
                    nemo laudantium corrupti perferendis voluptas. Voluptates consequuntur
                    totam necessitatibus cumque nisi?
                </p>
                <div className={styles.icons}>
                    <Image src="/facebook.png" alt="facebook" width={18} height={18} />
                    <Image src="/instagram.png" alt="instagram" width={18} height={18} />
                    <Image src="/linkedin.png" alt="linkedin" width={18} height={18} />
                    <Image src="/github.png" alt="github" width={18} height={18} />
                </div>
            </div>
            <div className={styles.links}>
                <div className={styles.list}>
                    <span className={styles.listTitle}>Links</span>
                    <Link className={styles.link} href="/">Homepage</Link>
                    <Link className={styles.link} href="/">Blog</Link>
                    <Link className={styles.link} href="/">About</Link>
                    <Link className={styles.link} href="/">Contact</Link>
                </div>
                <div className={styles.list}>
                    <span className={styles.listTitle}>Tags</span>
                    <Link className={styles.link} href="/">Style</Link>
                    <Link className={styles.link} href="/">Fasion</Link>
                    <Link className={styles.link} href="/">Coding</Link>
                    <Link className={styles.link} href="/">Travel</Link>
                    <Link className={styles.link} href="/">Food</Link>
                    <Link className={styles.link} href="/">Culture</Link>
                </div>
                <div className={styles.list}>
                    <span className={styles.listTitle}>Social</span>
                    <Link className={styles.link} href="/">Facebook</Link>
                    <Link className={styles.link} href="/">Instagram</Link>
                    <Link className={styles.link} href="/">Linkedin</Link>
                    <Link className={styles.link} href="/">Github</Link>
                </div>
            </div>
        </div>
    )
};

export default Footer
