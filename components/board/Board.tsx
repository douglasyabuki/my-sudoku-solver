// Hooks
import React, { useState } from "react";
import { useFetch } from "../../hooks/useFetch";

// Components
import Cell from "../cell/Cell";
import Button from "../button/Button";

// Constants
import { initialState } from "./board-values/initial-state";

// CSS
import styles from "./Board.module.css";

// This function is the game itself
export default function Board() {
  const [currentBoard, setCurrentBoard] = useState<number[][]>(initialState);

  // Function to change a cell input
  const onInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    rowId: number,
    colId: number
  ): void => {
    let copyBoard = [...currentBoard];
    copyBoard[rowId][colId] = +e.target.value;
    setCurrentBoard(copyBoard);
  };

  // Function to set the solved board by calling the custom hook
  const solution = useFetch({
    onSuccess: (response) => setCurrentBoard(response.solution),
  });

  // Function to clear the board
  const resetBoard = () => {
    let copyBoard = [...initialState];
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        copyBoard[row][col] = 0;
      }
    }
    setCurrentBoard(copyBoard);
  };

  // Main function return
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
        <Button value="Solve" onClick={() => solution.get(currentBoard)}></Button>
        <Button value="Reset" onClick={() => resetBoard()}></Button>
      </div>
    </div>
  );
}
