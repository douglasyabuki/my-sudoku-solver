// CSS
import styles from "./Cell.module.css";

interface Props {
  value: number;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
}

export default function Cell({ value, onChange }: Props) {
  return (
    <div className={styles.cell}>
      <input value={value || ''} onChange={onChange} type="number"></input>
    </div>
  );
}
