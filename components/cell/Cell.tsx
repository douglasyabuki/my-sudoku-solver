// Types
import { ValidInput } from "./valid-input/valid-input";

// CSS
import styles from "./Cell.module.css";

interface Props {
  value: ValidInput;
  onChange: React.ChangeEventHandler;
}

export default function Cell({ value, onChange }: Props) {
  return (
    <div className={styles.cell}>
      <input value={value} onChange={onChange}></input>
    </div>
  );
}
