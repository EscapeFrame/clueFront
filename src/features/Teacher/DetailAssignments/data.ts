import { CiCalendar } from "react-icons/ci";
import { IoIosCheckmarkCircleOutline, IoIosRemoveCircleOutline } from "react-icons/io";
import { HiOutlineFire } from "react-icons/hi2";
import { IconType } from "react-icons";

export const stateData: { icon: IconType; name: string }[] = [
    { icon: CiCalendar, name: "마감일" },
    { icon: IoIosCheckmarkCircleOutline, name: "제출완료" },
    { icon: IoIosRemoveCircleOutline, name: "미제출" },
    { icon: HiOutlineFire, name: "제출률" },
];