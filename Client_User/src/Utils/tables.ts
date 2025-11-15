import { PiStudentFill } from "react-icons/pi";
import { IoSettings } from "react-icons/io5";
import { IoLockOpenOutline } from "react-icons/io5";
import { PiStudent } from "react-icons/pi";

export const navBer = [
    { id: 1, name: "Home", link: "/home", symbl: PiStudentFill },
    { id: 2, name: "Home", link: "/home", symbl: PiStudentFill },
    { id: 3, name: "Home", link: "/home", symbl: PiStudentFill },
    { id: 4, name: "Setting", link: "/setting", symbl: IoSettings  },
];

export const settingList = [
    { id: 1, symbol: PiStudent, name: "User Profile", link: "/profile"},
    { id: 2, symbol: IoLockOpenOutline, name: "Change Password", link: ""},
    { id: 3, symbol: IoLockOpenOutline, name: "Ask Question", link: ""},
]