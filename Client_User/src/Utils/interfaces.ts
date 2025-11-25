export interface signUpInterface {
    name: string;
    email: string;
    collage_id: string;
    password: string;
    confirm_password: string;
    role: string;
    auth: boolean;
    image: File | null;
}

export interface loginInterface {
    email: string,
    password: string
}

export interface itemIterface {
    _id: string;
    title: string;
    description: string;
    category: string;
    location: string;
    post_by: string;
    status: string;
    image: string;
    image_public_id: string;
    createdAt: string;
    user: {
        _id: string;
        name: string;
        email: string;
        image: string;
    }
}