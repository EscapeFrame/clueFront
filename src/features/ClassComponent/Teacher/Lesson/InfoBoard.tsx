import Inquiry from "./Inquiry";
import Notice from "./Notice";

export default function InfoBoard() {
    return (
        <div style={{ margin: '0', display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '12rem',}}>
            <Notice />
            <Inquiry />
        </div>
    );
}