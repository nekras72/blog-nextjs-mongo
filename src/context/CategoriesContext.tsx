"use client";
import { Category, IChildren } from "@/types";
import { createContext, useEffect, useState } from "react";

interface ICategoriesContext {
    categories: Category[],
    triggerUpdateCategories: () => void,
    isLoadingCategories: boolean
}

const initialContextValue = {
    triggerUpdateCategories: () => undefined,
    categories: [],
    isLoadingCategories: false
};

const CategoriesContext = createContext<ICategoriesContext>(initialContextValue);

const getData = async () => {
    const res = await fetch('http://localhost:3000/api/categories', {
        method: 'GET',
        cache: 'no-cache'
    });

    if (!res.ok) {
        throw new Error('failed to get categories');
    }

    return res.json();
}

const CategoriesContextProvider: React.FC<IChildren> = ({ children }) => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [isLoadingCategories, setIsLoadingCategories] = useState<boolean>(false);

    const triggerUpdateCategories = async () => {
        setIsLoadingCategories(true);
        const data = await getData();
        if (data) {
            setCategories(data)
        }
        setIsLoadingCategories(false);
    }

    useEffect(() => {
        triggerUpdateCategories()
    }, []);

    return <CategoriesContext.Provider value={{ categories, triggerUpdateCategories, isLoadingCategories }}>
        {children}
    </CategoriesContext.Provider>
};

export { CategoriesContext, CategoriesContextProvider };