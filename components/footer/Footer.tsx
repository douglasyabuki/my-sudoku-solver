// CSS
import styles from "./Footer.module.css";

// Fonts
import { Roboto } from "@next/font/google";

const roboto = Roboto({ subsets: ["latin"], weight: ["400", "500", "700"] });

export default function Footer() {
  return (
    <footer className={`${roboto.className} ${styles.footer}`}>
      <h3>Douglas Yuji Yabuki @2022</h3>
    </footer>
  );
}
