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