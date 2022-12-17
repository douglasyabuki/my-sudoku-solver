// CSS
import styles from "./Cell.module.css";

// Props destructuring
interface Props {
  value: number;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
}

// When called, this cell function displays a single sudoku square
export default function Cell({ value, onChange }: Props) {
  return (
    <div className={styles.cell}>
      <input value={value || ""} onChange={onChange} type="number"></input>
    </div>
  );
}
