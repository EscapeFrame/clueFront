import { IoBookOutline } from "react-icons/io5";
import { HiOutlineAcademicCap, HiOutlineUserGroup } from "react-icons/hi2";
import { CiClock2 } from "react-icons/ci";
import { FaRegUser } from "react-icons/fa";
import { IconType } from "react-icons";
import { LINK_CATEGORY_MAP } from '@/linkSave/types/card';

export interface CategoryItem {
  name: string;
  icon?: IconType; // '전체'는 아이콘이 없으므로 optional
}

export const categoryData: CategoryItem[] = [
    { name: LINK_CATEGORY_MAP.Total },
    { name: LINK_CATEGORY_MAP.General, icon: IoBookOutline },
    { name: LINK_CATEGORY_MAP.Professional, icon: HiOutlineAcademicCap },
    { name: LINK_CATEGORY_MAP.AfterSchool, icon: CiClock2 },
    { name: '반', icon: HiOutlineUserGroup },
    { name: '내 링크', icon: FaRegUser },
];