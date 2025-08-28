import { useNavigate } from "react-router-dom"

interface Data {
    title: string,
    body: string,
    url: string
}

export function SetData({ title, body, url }: Data) {
    const navigate = useNavigate();

    const move = () => {
        navigate(`setting/${url}`);
    }
    return (
        <div onClick={move}>
            <span>{title}</span>
            <p>{body}</p>
        </div>
    )
}