"use client";
import { Category, IChildren } from "@/types";
import { createContext, useEffect, useState } from "react";

interface ICategoriesContext {
    categories: Category[],
    triggerUpdateCategories: () => void
}

const initialContextValue = {
    triggerUpdateCategories: () => undefined,
    categories: []
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

    const triggerUpdateCategories = async () => {
        const data = await getData();
        if (data) {
            console.log({ cats: data });
            setCategories(data)
        }
    }

    useEffect(() => {
        triggerUpdateCategories()
    }, []);

    return <CategoriesContext.Provider value={{ categories, triggerUpdateCategories }}>
        {children}
    </CategoriesContext.Provider>
};

export { CategoriesContext, CategoriesContextProvider };