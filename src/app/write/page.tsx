"use client"
import styles from './writePage.module.css';
import 'react-quill/dist/quill.bubble.css';
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from 'next/image';
import { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import { slugify, uploadFile } from '@/helpers';
import { NewPost } from '@/types';

const WritePage = () => {
  const { status } = useSession();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [text, setText] = useState<string>('');
  const [file, setFile] = useState<File | null>(null);
  const [media, setMedia] = useState('');
  const [title, setTitle] = useState('');
  const [catSlug, setCatSlug] = useState('');

  useEffect(() => {
    file && uploadFile({ file, setMedia });
  }, [file]);

  const handleSubmit = async () => {
    const bodyObj: NewPost = {
      slug: slugify(title),
      title,
      desc: text,
      catSlug,
    };
    if (media) {
      bodyObj.img = media;
    }
    const response = await fetch('/api/posts', {
      method: 'POST',
      body: JSON.stringify(bodyObj)
    });
    console.log({ response });

    if (response.status === 200) {
      const data = await response.json();
      router.push(`/posts/${data.slug}`);
    }
  };

  if (status === 'loading') {
    return <div className={styles.loading}>Loading...</div>
  }

  if (status === 'unauthenticated') {
    router.push('/');
  }
  return (
    <div className={styles.container}>
      <input className={styles.input} placeholder="Title" type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
      <select className={styles.select} onChange={(e) => setCatSlug(e.target.value)}>
        <option value="style">style</option>
        <option value="fashion">fashion</option>
        <option value="food">food</option>
        <option value="culture">culture</option>
        <option value="travel">travel</option>
        <option value="coding">coding</option>
      </select>
      <div className={styles.editor}>
        <button className={styles.button} onClick={() => setIsOpen(state => !state)}>
          <Image
            src='/plus.svg'
            alt="plus"
            width={16}
            height={16}
          />
        </button>
        {isOpen &&
          <div className={styles.add}>
            <input
              className={styles.hiddenElement}
              type="file"
              id='image'
              onChange={(e) => setFile(e.target.files?.[0] || null)}
            />
            <button className={styles.addButton}>
              <label htmlFor="image">
                <Image
                  src='/image.svg'
                  alt="image"
                  width={16}
                  height={16}
                />
              </label>
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
      <button className={styles.publish} onClick={handleSubmit}>Publish</button>
    </div>
  )
};

export default WritePage;
