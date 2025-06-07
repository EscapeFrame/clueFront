import { Steps } from "antd";
import styles from "@/shared/css/Home/Schedule/TimeLine.module.css";
import { scheduleState } from "@/shared/recoil/atoms";
import { useRecoilValue } from "recoil";

const TimeLine = () => {

  const schedule = useRecoilValue(scheduleState); 

  const current = 0; //백엔드 맡기기 or 시간보고 계산해서 하기?

  if (!Array.isArray(schedule)) {
    return <div>시간표 데이터를 불러오는 중입니다...</div>;
  }


  return (
    <Steps
      direction="vertical"
      current={current} //현재 몇교시에 있는지 나타냄
      className={styles.customStep}
      items={schedule.map((step, index) => {
        // 상태 판단
        const status =
          index == current
            ? "done"
            : "pending";

        return {
          title: (
            <div className={styles.step_box}>{step.subject}
              <p>수업내용</p>
            </div>
          ),
          icon: (
            <div
              className={`${styles.customIcon} ${
                styles[`status_${status}`]
              }`}
            >
              {step.period}
            </div>
          ),
        };
      })}
    />
  );
};

export default TimeLine;
