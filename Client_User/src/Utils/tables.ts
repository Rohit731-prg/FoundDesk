import { PiStudentFill } from "react-icons/pi";
import { IoSettings } from "react-icons/io5";
import { IoLockOpenOutline } from "react-icons/io5";
import { PiStudent } from "react-icons/pi";
import { CiCircleQuestion } from "react-icons/ci";
import { AiFillProduct } from "react-icons/ai";

export const navBer = [
    { id: 1, name: "Home", link: "/home", symbl: PiStudentFill },
    { id: 2, name: "products", link: "/products", symbl: AiFillProduct },
    { id: 3, name: "Home", link: "/home", symbl: PiStudentFill },
    { id: 4, name: "Setting", link: "/setting", symbl: IoSettings  },
];

export const settingList = [
    { id: 1, symbol: PiStudent, name: "User Profile", link: "/profile"},
    { id: 2, symbol: IoLockOpenOutline, name: "Change Password", link: ""},
    { id: 3, symbol: CiCircleQuestion, name: "Ask Question", link: ""},
];

export const postCategory = [
    { id: 0, name: "All" },
    { id: 1, name: "Electronics" },
    { id: 2, name: "Accessories" },
    { id: 3, name: "Bags" },
    { id: 4, name: "Documents" },
    { id: 5, name: "Clothing" },
    { id: 6, name: "Vehicles" },
    { id: 7, name: "Miscellaneous" },
]