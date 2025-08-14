import TimeLine from "@/features/Teacher/AddTimeLine";
import { IoInformationCircleOutline } from "react-icons/io5";
import { MdOutlineFileDownload } from "react-icons/md";
import * as s from './styles';
import { useRef } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";


export default function AddTimeLine() {
  const timeLineRef = useRef<HTMLDivElement>(null);

  const handleSavePDF = async () => {
    if (!timeLineRef.current) return;
    const element = timeLineRef.current;
    const canvas = await html2canvas(element, { scale: 2 });
    const img = canvas.toDataURL("image/png");
    const pdf = new jsPDF({ orientation: "landscape", unit: "pt", format: "a4" });
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();
    // 화면에 맞게 넓이 구하기
    const imgExtent = canvas.width / canvas.height;
    let width = pdfWidth;
    let height = pdfWidth / imgExtent;
    if (height > pdfHeight) {
      height = pdfHeight;
      width = pdfHeight * imgExtent;
    }
    pdf.addImage(img, "PNG", (pdfWidth - width) / 2, 40, width, height - 40);
    pdf.save("시간표.pdf");
  };

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
            <s.PDFB onClick={handleSavePDF}>
              <MdOutlineFileDownload /> PDF로 저장
            </s.PDFB>
          </s.ButtonGroup>
        </s.LeftPanel>

        <s.RightPanel>
          <div ref={timeLineRef}>
            <TimeLine />
          </div>
        </s.RightPanel>
      </s.ContentWrapper>
    </s.Container>
  );
}