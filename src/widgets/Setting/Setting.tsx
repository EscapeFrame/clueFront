import { HiOutlineAdjustmentsHorizontal } from "react-icons/hi2";
import { SettingButton } from '@/widgets/Setting/styles';

export function Setting() {
  return (
    <SettingButton>
      <HiOutlineAdjustmentsHorizontal />
      정렬
    </SettingButton>
  );
}
