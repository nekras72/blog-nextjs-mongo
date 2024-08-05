import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import firebaseApp from "./utils/firebase";
import { Dispatch, SetStateAction } from "react";

export const getPrettyDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toDateString();
}
interface IUploadFile {
    file: File,
    setMedia?: Dispatch<SetStateAction<string>>,
    catName?: string,
    manageLoadingState?: (isLoading: boolean) => void
    successCallback?: (url: string) => void
}
export const uploadFile = ({ file, setMedia, catName, manageLoadingState, successCallback }: IUploadFile) => {
    const storage = getStorage(firebaseApp);
    const uniqueName = `${new Date().getTime()}-${catName ? `${catName.toLowerCase()}-` : ''}${file.name}`
    const storageRef = ref(storage, uniqueName);

    const uploadTask = uploadBytesResumable(storageRef, file);

    // Register three observers:
    // 1. 'state_changed' observer, called any time the state changes
    // 2. Error observer, called on failure
    // 3. Completion observer, called on successful completion
    uploadTask.on('state_changed',
        (snapshot) => {
            // Observe state change events such as progress, pause, and resume
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
            console.log(snapshot.state);

            switch (snapshot.state) {
                case 'paused':
                    console.log('Upload is paused');
                    break;
                case 'running':
                    console.log('Upload is running');
                    manageLoadingState && manageLoadingState(true);
                    break;
            }
        },
        (error) => {
            // Handle unsuccessful uploads
        },
        () => {
            // Handle successful uploads on complete
            // For instance, get the download URL: https://firebasestorage.googleapis.com/...
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                if (successCallback) {
                    successCallback(downloadURL);
                } else setMedia && setMedia(downloadURL);
            });
            manageLoadingState && manageLoadingState(false);
        }
    );
}

export const slugify = (str: string): string => {
    return str.toLowerCase().trim().replace(/[^\w\s-]/g, '').replace(/[\s_-]+/g, '-').replace(/^-+|-+$/g, '');
}

export const swrFetcher = async (url: string) => {
    const res = await fetch(url);
    const data = await res.json();
    if (!res.ok) {
        throw new Error(data.message);
    };
    return data;
};