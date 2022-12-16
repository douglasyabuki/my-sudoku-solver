// Hooks
import { useState } from "react";

// Components
import * as React from "react";
import Cell from "../cell/Cell";

// Constants
import { initialState } from "./board-values/initial-state";
import { boardExample } from "./board-values/board-example";

// Types
import { ValidInput } from "../cell/valid-input/valid-input";

// CSS
import styles from "./Board.module.css";

export default function Board() {
  const [board, setBoard] = useState<ValidInput[][]>(initialState);

  const onValueChange = () => {};

  return (
    <div className={styles.game}>
      <div className={styles.boardContainer}>
        {board.map((row, rowId) => (
          <div className={styles.row} key={rowId}>
            {row.map((number, colId) => (
              <div key={colId}>
                <Cell onChange={onValueChange} value={number}></Cell>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
