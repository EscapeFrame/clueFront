import TimeLine from "@/features/Teacher/AddTimeLine";
import { IoInformationCircleOutline } from "react-icons/io5";
import { MdOutlineFileDownload } from "react-icons/md";
import * as s from './styles';


export default function AddTimeLine() {
  return (
    <s.Container>
      <s.Title>시간표 수정하기</s.Title>
      
      <s.InfoBox>
        <s.InfoIcon><IoInformationCircleOutline /></s.InfoIcon>
        <s.InfoText>글자의 내용이나 칸을 선택하면 내용을 수정하실 수 있습니다.</s.InfoText>
      </s.InfoBox>
      
      <s.ContentWrapper>
        <s.LeftPanel>
          <s.TeacherInput>
            <s.TeacherInputField 
              type="text" 
              placeholder="교사 이름을 입력하세요"
            />
          </s.TeacherInput>
          
          <s.ButtonGroup>
            <s.GoogleSheetB>
              구글 시트에서 가져오기
            </s.GoogleSheetB>
            <s.PDFB>
            <MdOutlineFileDownload /> PDF로 저장
            </s.PDFB>
          </s.ButtonGroup>
        </s.LeftPanel>
        <s.RightPanel>
          <TimeLine />
        </s.RightPanel>
      </s.ContentWrapper>
    </s.Container>
  );
}