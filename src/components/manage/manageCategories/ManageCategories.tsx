'use client'

import Loader from '@/components/loader/Loader';
import Image from "next/image";
import styles from './manageCategories.module.css';
import { slugify, uploadFile } from "@/helpers";
import useCategories from "@/hooks/useCategories";
import { Category, NewCat, UpdateCat } from "@/types";
import { useMemo, useState } from "react";

const ManageCategories = () => {
    const { categories, triggerUpdateCategories, isLoadingCategories } = useCategories();

    const [isCreatingNewCategory, setIsCreatingNewCategory] = useState(false);
    const [isUpdatingCategory, setIsUpdatingCategory] = useState(false);
    const [isLoadingCatPict, setIsLoadingCatPict] = useState(false);
    const [newCatTitle, setNewCatTitle] = useState('');
    const [categoryUnderUpdate, setCategoryUnderUpdate] = useState<Category | null>(null);
    const [newCatColor, setNewCatColor] = useState(categoryUnderUpdate?.color ?? '');
    const [catFile, setCatFile] = useState<File | null>(null);
    const [catImageSrc, setCatImageSrc] = useState<string | null>(null);

    const manageLoadingState = (loadingState: boolean) => {
        isLoadingCatPict !== loadingState && setIsLoadingCatPict(loadingState);
    }
    const cleanUpSuccessCreatingCat = () => {
        triggerUpdateCategories();
        setCatFile(null);
        setNewCatTitle('')
        setNewCatColor('');
        categoryUnderUpdate && setCategoryUnderUpdate(null);
        isCreatingNewCategory && setIsCreatingNewCategory(false);
        isUpdatingCategory && setIsUpdatingCategory(false);
    }

    const uploadCatPictCallback = async (catUrl?: string) => {
        let newCatBodyObj: NewCat | null = null;
        let updateCatBodyObj: UpdateCat | null = null;
        const newSlug = slugify(newCatTitle);
        if (isCreatingNewCategory && catUrl) {
            newCatBodyObj = {
                slug: newSlug,
                title: newCatTitle,
                img: catUrl,
                color: newCatColor
            };
        } else if (isUpdatingCategory && categoryUnderUpdate && catUrl) {
            console.log('updating category IMAGE');

            updateCatBodyObj = {};
            updateCatBodyObj.img = catUrl;
            updateCatBodyObj.slug = newSlug;
            if (newSlug !== categoryUnderUpdate.slug) updateCatBodyObj.oldSlug = categoryUnderUpdate.slug;
            if (newCatTitle !== categoryUnderUpdate.title) updateCatBodyObj.title = newCatTitle;
            if (newCatColor !== categoryUnderUpdate.color) updateCatBodyObj.color = newCatColor;
        } else if (isUpdatingCategory && categoryUnderUpdate && !catUrl) {
            console.log('updating category WITHOUT IMAGE');
            updateCatBodyObj = {};
            updateCatBodyObj.slug = newSlug;
            if (newSlug !== categoryUnderUpdate.slug) updateCatBodyObj.oldSlug = categoryUnderUpdate.slug;
            if (newCatTitle !== categoryUnderUpdate.title) updateCatBodyObj.title = newCatTitle;
            if (newCatColor !== categoryUnderUpdate.color) updateCatBodyObj.color = newCatColor;
        }

        let url = '/api/categories';
        if (updateCatBodyObj?.slug || updateCatBodyObj?.oldSlug) {
            url = `/api/manage?updateParam=category`;
        }
        const response = await fetch(url, {
            method: 'POST',
            body: JSON.stringify(newCatBodyObj ?? updateCatBodyObj)
        });

        if (response.status === 200) {
            cleanUpSuccessCreatingCat();
        }
    }

    const pickedCatImageSrc: string | null = isCreatingNewCategory && catFile ? catImageSrc : categoryUnderUpdate && categoryUnderUpdate.img === catImageSrc ? categoryUnderUpdate.img : catImageSrc ?? null;

    const handleCreateNewOrUpdateCategory = async () => {
        if (!isCreatingNewCategory && !isUpdatingCategory) {
            setIsCreatingNewCategory(state => !state);
        } else if (isCreatingNewCategory) {
            catFile && uploadFile({
                file: catFile,
                catName: newCatTitle,
                manageLoadingState,
                successCallback: uploadCatPictCallback
            });
        } else if (isUpdatingCategory) {
            if (pickedCatImageSrc !== categoryUnderUpdate?.img && catFile) {
                uploadFile({
                    file: catFile,
                    catName: newCatTitle,
                    manageLoadingState,
                    successCallback: uploadCatPictCallback
                });
            } else {
                uploadCatPictCallback();
            }

        }
    };

    const handleRemoveCategory = async (deleteCatSlug: string) => {
        const response = await fetch(`/api/manage?deleteCatSlug=${deleteCatSlug}`, {
            method: 'DELETE'
        });
        console.log(response);
        if (response.ok && response.status === 200) {
            triggerUpdateCategories();
        }
    };

    const handleCancelUpdate = () => {
        categoryUnderUpdate && setCategoryUnderUpdate(null);
        isCreatingNewCategory && setIsCreatingNewCategory(false)
        isUpdatingCategory && setIsUpdatingCategory(false);
        newCatColor && setNewCatColor('');
    };

    const handleCategoryClick = (cat: Category) => {
        if (!categoryUnderUpdate?.id || categoryUnderUpdate.id !== cat.id) {
            setCategoryUnderUpdate(cat);
            setNewCatColor(cat.color);
            setNewCatTitle(cat.title);
        }
    };

    const handleEditCategory = (cat: Category) => {
        setIsUpdatingCategory(true);
    }

    const isDisabledCreateCategory = useMemo(
        () => isCreatingNewCategory && (newCatTitle.trim() === '' || newCatColor.trim() === '' || catFile == null),
        [catFile, isCreatingNewCategory, newCatColor, newCatTitle]);

    const isAddCatPictBtnDisabled = useMemo(
        () => (newCatTitle.trim() === '' || newCatColor.trim() === ''),
        [newCatTitle, newCatColor]);

    const showNewCatHints = newCatTitle.trim() === '' || newCatColor.trim() === '' || catFile !== null;

    // TODO fix newCatColor update bug

    return (
        isLoadingCategories ? <Loader /> :
            <div className={styles.container}>
                <div className={styles.allCategories}>
                    {categories && categories.map((cat, i) =>
                        <div key={`${cat.id}-${i}`} className={styles.catButtonContainer}>
                            {categoryUnderUpdate?.id === cat.id ? <div className={styles.catManageButtonsContainer}>
                                <button onClick={() => handleEditCategory(cat)} className={`${styles.catManageButton} ${styles.edit}`}>
                                    <Image alt='' width={16} height={16} src='/catManageIcons/edit.svg' />
                                </button>
                                <button onClick={() => handleRemoveCategory(cat.slug)} className={`${styles.catManageButton} ${styles.remove}`}>
                                    <Image alt='' width={16} height={16} src='/catManageIcons/remove.svg' />
                                </button>
                                <button onClick={handleCancelUpdate} className={`${styles.catManageButton} ${styles.close}`}>
                                    <Image alt='' width={16} height={16} src='/catManageIcons/close.svg' />
                                </button>
                            </div> :
                                <button onClick={() => handleCategoryClick(cat)} className={styles.category} style={{ backgroundColor: cat.color }}>
                                    {cat.img &&
                                        <Image className={styles.image} alt="" src={cat.img} width={32} height={32} />}
                                    {cat.title}
                                </button>}
                        </div>
                    )}
                </div>
                <button
                    disabled={isDisabledCreateCategory}
                    onClick={handleCreateNewOrUpdateCategory}
                    className={styles.createCategoryButton}
                >
                    {isUpdatingCategory ? 'Update' : 'Create'} Category
                </button>
                <div className={styles.newCategoryDataPlaceholder}>
                    {(isCreatingNewCategory || isUpdatingCategory) &&
                        <div className={styles.newCategoryDataContainer}>
                            {showNewCatHints &&
                                <div className={styles.newCategoryStatus}>
                                    {newCatTitle.trim() === '' && <p>set category name</p>}
                                    {newCatColor.trim() === '' && <p>pick category color</p>}
                                    {catFile === null && <p>pick category image</p>}
                                </div>}
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
                            <button disabled={isAddCatPictBtnDisabled} className={styles.newCategoryImageButton}>
                                <label htmlFor="catImage">{pickedCatImageSrc ? 'Edit' : 'Add'} Image</label>
                            </button>
                            {pickedCatImageSrc && <Image alt='' className={styles.image} width={32} height={32} src={pickedCatImageSrc} />}
                            <button onClick={handleCancelUpdate} className={styles.newCategoryImageButton}>X</button>
                            <input
                                disabled={isAddCatPictBtnDisabled}
                                className={styles.hiddenElement}
                                type="file"
                                id='catImage'
                                onChange={(e) => {
                                    const file = e.target.files?.[0];
                                    if (file) {
                                        const reader = new FileReader();
                                        reader.onloadend = () => {
                                            setCatImageSrc(reader.result as string);
                                        };
                                        reader.readAsDataURL(file);
                                    }
                                    setCatFile(file || null);
                                }}
                            />
                        </div>
                    }
                </div>
            </div >
    )
};

export default ManageCategories;
