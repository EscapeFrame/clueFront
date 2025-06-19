import TInquiry from "./TInquiry";
import TNotice from "./TNotice";

export default function InfoBoard() {
    return (
        <div style={{ margin: '0', display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '12rem',}}>
            <TNotice />
            <TInquiry />
        </div>
    );
}