import styles from '@/shared/css/Home/Accouncement/Inventory.module.css';
import { useNavigate } from 'react-router-dom';

interface InventoryContentType {
  title: string;
  link: string;
  date: string;
}

interface InventoryType {
  title: string;
  contents: InventoryContentType[];
}

interface InventoryProps {
  InventoryList: InventoryType[];
}

export default function Inventory({ InventoryList }: InventoryProps) {
  const navigate = useNavigate();

  return (
    <>
      {InventoryList.map((data, idx) => (
        <div key={idx} className={styles.container}>
          {data.contents.map((content, cIdx) => (
            <div
              key={cIdx}
              onClick={() => navigate(content.link)}
              style={{ cursor: 'pointer' }}
            >
              <span>{content.title}</span>
              <span>{content.date}</span>
            </div>
          ))}
        </div>
      ))}
    </>
  );
}
