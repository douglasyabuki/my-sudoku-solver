// CSS
import styles from "./Cell.module.css";

// Props destructuring
interface Props {
  value: number;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
}

// This function displays a single sudoku square
export default function Cell({ value, onChange }: Props) {
  return (
    <div className={styles.cell}>
      <input type="number" min={0} max={9} value={value || ""} onChange={onChange}></input>
    </div>
  );
}
