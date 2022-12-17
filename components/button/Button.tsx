// CSS
import styles from './Button.module.css'

// Props destructuring
export interface Props {
    value: string;
    onClick?: React.MouseEventHandler
}

// This function exports a generic button that accepts an event and a value
export default function Button ({value, onClick}: Props) {
  return (
    <div className={styles.buttonContainer}>
      <button onClick={onClick} value={value}>{value}</button>
    </div>
  );
}
