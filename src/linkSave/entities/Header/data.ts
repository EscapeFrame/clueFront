import { GoBriefcase } from "react-icons/go";
import { IoBookOutline } from "react-icons/io5";
import { HiOutlineAcademicCap } from "react-icons/hi2";
import { CiClock2 } from "react-icons/ci";
import { IconType } from "react-icons";

export interface CategoryItem {
  name: string;
  icon?: IconType; // '전체'는 아이콘이 없으므로 optional
}

export const categoryData: CategoryItem[] = [
  { name: "전체" },
  { name: "반", icon: GoBriefcase },
  { name: "인문과목", icon: IoBookOutline },
  { name: "전공과목", icon: HiOutlineAcademicCap },
  { name: "방과후", icon: CiClock2 },
];