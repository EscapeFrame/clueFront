import { Steps } from "antd";
import { scheduleState } from "@/shared/recoil/atoms";
import { useRecoilValue } from "recoil";
import { StepBox, CustomIcon } from './TimeLine.styles';

const TimeLine = () => {

  const schedule = useRecoilValue(scheduleState); // 데이터 따로 들어옴

  const current = 0; //백엔드 맡기기 or 시간보고 계산해서 하기?

  if (!Array.isArray(schedule)) {
    return <div>시간표 데이터를 불러오는 중입니다...</div>;
  }

  return (
    <Steps
      direction="vertical"
      current={current} //현재 몇교시에 있는지 나타냄
      items={schedule.map((step, index) => {
        // 상태 판단
        const status =
          index == current
            ? "done"
            : "pending";

        return {
          title: (
            <StepBox>{step.subject}
              <p>수업내용</p>
            </StepBox>
          ),
          icon: (
            <CustomIcon status={status as 'done' | 'pending'}>
              {step.period}
            </CustomIcon>
          ),
        };
      })}
    />
  );
};

export default TimeLine;
