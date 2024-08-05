"use client"
import styles from './writePage.module.css';
import 'react-quill/dist/quill.bubble.css';
import { redirect } from "next/navigation";
import Image from 'next/image';
import { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import { slugify, uploadFile } from '@/helpers';
import { NewCat, NewPost } from '@/types';
import useCategories from '@/hooks/useCategories';
import useUser from '@/hooks/useUser';

const WritePage = () => {
  const { isAdmin } = useUser();

  if (!isAdmin) {
    redirect('/');
  }

  const { categories, triggerUpdateCategories } = useCategories();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [text, setText] = useState<string>('');
  const [file, setFile] = useState<File | null>(null);
  const [media, setMedia] = useState('');
  const [title, setTitle] = useState('');
  const [catSlug, setCatSlug] = useState('');

  const [isCreatingNewCategory, setIsCreatingNewCategory] = useState(false);
  const [newCatTitle, setNewCatTitle] = useState('');
  const [newCatColor, setNewCatColor] = useState('');
  const [catFile, setCatFile] = useState<File | null>(null);
  const [catUrl, setCatUrl] = useState(categories?.[0]?.slug ?? '');

  const cleanUpSuccessLoading = () => {
    setCatFile(null);
    setCatUrl('');
    setNewCatTitle('')
    setIsCreatingNewCategory(false);
    setNewCatColor('');
  }

  const isDisabledCreateCategory = isCreatingNewCategory && (newCatTitle.trim() === '' || newCatColor === '' || catFile === null);

  // TODO change upload flow (pass success callback to uploadFile)

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

    if (response.status === 200) {
      const data = await response.json();
      redirect(`/posts/${data.slug}`);
    }
  };

  const handleCreateNewCategory = async () => {
    if (!isCreatingNewCategory) {
      setIsCreatingNewCategory(state => !state);
    } else {
      const bodyObj: NewCat = {
        slug: slugify(newCatTitle),
        title: newCatTitle,
        img: catUrl,
        color: newCatColor
      };
      const response = await fetch('/api/categories', {
        method: 'POST',
        body: JSON.stringify(bodyObj)
      });

      if (response.status === 200) {
        cleanUpSuccessLoading();
        triggerUpdateCategories();
      }
    }
  };

  useEffect(() => {
    if (file) {
      uploadFile({ file, setMedia });
    } else if (catFile) uploadFile({ file: catFile, setMedia: setCatUrl, catName: newCatTitle });
  }, [file, catFile]);

  return (
    <div className={styles.container}>
      <input className={styles.input} placeholder="Title" type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
      <div className={styles.categoryActionsContainer}>
        {categories && <select className={styles.select} onChange={(e) => setCatSlug(e.target.value)}>
          {categories.map((cat) => (<option key={cat.id} value={cat.slug}>{cat.title}</option>))}
        </select>}
        <button disabled={isDisabledCreateCategory} onClick={handleCreateNewCategory} className={styles.createCategoryButton}>Create Category</button>
      </div>
      <div className={styles.newCategoryDataPlaceholder}>
        {isCreatingNewCategory && <div className={styles.newCategoryDataContainer}>
          <input
            placeholder="Category name"
            value={newCatTitle}
            onChange={(e) => setNewCatTitle(e.target.value)}
            className={styles.newCategoryInput}
            type="text"
          />
          <input
            placeholder="Category color"
            value={newCatColor}
            onChange={(e) => setNewCatColor(e.target.value)}
            className={styles.newCategoryColorInput}
            type="color"
          />
          <button disabled={newCatTitle.trim() === ''} className={styles.newCategoryImageButton}>
            <label htmlFor="catImage">Add Image</label>
          </button>
          <button onClick={() => setIsCreatingNewCategory(false)} className={styles.newCategoryImageButton}>X</button>
          <input
            className={styles.hiddenElement}
            type="file"
            id='catImage'
            onChange={(e) => setCatFile(e.target.files?.[0] || null)}
          />
        </div>}
      </div>
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
        <div className={styles.textAreaContainer}>
          <ReactQuill
            className={styles.textArea}
            theme='bubble'
            value={text}
            onChange={setText}
            placeholder='Tell your story'
          />
        </div>
      </div>
      <button className={styles.publish} onClick={handleSubmit}>Publish</button>
    </div>
  )
};

export default WritePage;
