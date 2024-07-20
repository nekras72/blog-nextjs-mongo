"use client"
import styles from './writePage.module.css';
import 'react-quill/dist/quill.bubble.css';
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from 'next/image';
import { useState } from "react";
import ReactQuill from "react-quill";

const WritePage = () => {
  const { status } = useSession();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [text, setText] = useState<string>('');

  if (status === 'loading') {
    return <div className={styles.loading}>Loading...</div>
  }

  if (status === 'unauthenticated') {
    router.push('/');
  }
  return (
    <div className={styles.container}>
      <input className={styles.input} placeholder="Title" type="text" />
      <div className={styles.editor}>
        <button className={styles.button} onClick={() => setIsOpen(state => !state)}>
          <Image
            src='/plus.svg'
            alt="plus"
            width={16}
            height={16}
          />
        </button>
        {isOpen && <div className={styles.add}>
        <button className={styles.addButton}>
          <Image
            src='/image.svg'
            alt="image"
            width={16}
            height={16}
          />
        </button>
        <button className={styles.addButton}>
          <Image
            src='/external.svg'
            alt="external"
            width={16}
            height={16}
          />
        </button>
        <button className={styles.addButton}>
          <Image
            src='/video.svg'
            alt="video"
            width={16}
            height={16}
          />
        </button>
        </div>}
        <ReactQuill
        className={styles.textArea}
        theme='bubble'
        value={text}
        onChange={setText}
        placeholder='Tell your story'
        />
      </div>
      <button className={styles.publish}>Publish</button>
    </div>
  )
};

export default WritePage;
