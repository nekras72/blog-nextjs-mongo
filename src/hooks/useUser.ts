import { UserAuthContext } from "@/context/UserAuthContext";
import { useContext } from "react";

const useUser = () => {
    const context = useContext(UserAuthContext);

    if (!context) {
        throw new Error("useCategories must be used within a CategoriesContextProvider");
    }

    return context;
};

export default useUser;
