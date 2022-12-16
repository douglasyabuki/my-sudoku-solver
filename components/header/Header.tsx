// CSS
import styles from "./Header.module.css";

// Fonts
import { Roboto } from "@next/font/google";

const roboto = Roboto({ subsets: ["latin"], weight: ["400", "500", "700"] });

export default function Header() {
  return (
    <header className={`${roboto.className} ${styles.header}`}>
      <h1>React + TS + NextAPI Sudoku Solver</h1>
    </header>
  );
}
