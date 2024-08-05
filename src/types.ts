export interface IChildren {
    children: React.ReactNode | React.ReactNode[];
}

export type Category = {
    id: string,
    slug: string,
    title: string,
    img: string,
    posts: Post[],
    color: string
}

export type Post = {
    _id: string,
    createdAt: string,
    slug: string,
    title: string,
    desc: string,
    img?: string,
    views: number,
    catSlug: string,
    cat: Category,
    userEmail: string,
    user: User,
    comments: Comment[]
}

export type NewPost = Omit<Post, '_id' | 'createdAt' | 'views' | 'cat' | 'user' | 'userEmail' | 'comments'>
export type NewCat = Omit<Category, 'id' | 'posts'>;
export type UpdateCat = Partial<Omit<Category, 'id' | 'posts'>> & {
    oldSlug?: string;
};

export type User = {
    name: string,
    _id: string,
    email: string,
    emailVerified: Date,
    image?: string,
    //   accounts      Account[]
    //   sessions      Session[]
    posts: Post[],
    comments: Comment[]
}

export type Comment = {
    _id: string,
    createdAt: string
    desc: string,
    userEmail: string,
    user: User,
    postSlug: string,
    post: Post
}

export type SearchParams = {
    cat?: string,
    page: number,
}