import { CategoriesContext } from "@/context/CategoriesContext";
import { useContext } from "react";

const useCategories = () => {
    const context = useContext(CategoriesContext);

    if (!context) {
        throw new Error("useCategories must be used within a CategoriesContextProvider");
    }

    return context;
};

export default useCategories;
