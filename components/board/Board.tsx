// Hooks
import React, { useState } from "react";

// Components
import { ChangeEvent } from "react";
import Cell from "../cell/Cell";
import Button from "../button/Button";

// Constants
import { boardExample } from "./board-values/board-example";
import { initialState } from "./board-values/initial-state";

// CSS
import styles from "./Board.module.css";

// This function is the game itself
export default function Board() {
  const [currentBoard, setCurrentBoard] = useState<number[][]>(boardExample);

  const onInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    rowId: number,
    colId: number
  ): void => {
    let copyBoard = [...currentBoard];
    copyBoard[rowId][colId] = +e.target.value;
    setCurrentBoard(copyBoard);
    console.log(currentBoard);
  };

  const resetBoard = () => {
    let copyBoard = [...initialState]
    setCurrentBoard(copyBoard);
  }

  return (
    <div className={styles.game}>
      <div className={styles.board}>
        {currentBoard.map((row, rowId) => (
          <div className={styles.row} key={rowId}>
            {row.map((number, colId) => (
              <div className={styles.cell} key={colId}>
                <Cell
                  onChange={(e) => onInputChange(e, rowId, colId)}
                  value={number}
                ></Cell>
              </div>
            ))}
          </div>
        ))}
      </div>
      <div className={styles.buttonsContainer}>
        <Button value="Teste" onClick={() => resetBoard()}></Button>
        <Button value="Reset" onClick={() => resetBoard()}></Button>
      </div>
    </div>
  );
}
