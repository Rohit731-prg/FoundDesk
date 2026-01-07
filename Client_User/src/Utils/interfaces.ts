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
    status: string;
    image: string;
    image_public_id: string;
    createdAt: string;
    post_by: {
        _id: string;
        name: string;
        email: string;
        image: string;
        phone: String;
    }
}

export interface claimInterface {
    item: {
        title: string;
        status: string;
        image: string;
    },
    proof: string;
    claim_date: string;
    status: string;
    _id: string;
}

export interface RequestClaimInterface {
    item_id: string;
    proof: File | null;
}


export interface QuestionInterface {
    _id: string;
    question: string;
    answer: string | null;
    admin: string | null;
    createdAt: string;
}