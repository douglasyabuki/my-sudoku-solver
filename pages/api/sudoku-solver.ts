// Imports
import { NextApiRequest, NextApiResponse } from "next";

// Creating a type to avoid repetition
type Board = number[][]

const initialBoard: Board = [
    [0, 0, 0, 0, 0, 0, 8, 0, 0],
    [0, 0, 4, 0, 0, 8, 0, 0, 9],
    [0, 7, 0, 0, 0, 0, 0, 0, 5],
    [0, 1, 0, 0, 7, 5, 0, 0, 8],
    [0, 5, 6, 0, 9, 1, 3, 0, 0],
    [7, 8, 0, 0, 0, 0, 0, 0, 0],
    [0, 2, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 9, 3, 0, 0, 1, 0],
    [0, 0, 5, 7, 0, 0, 4, 0, 3]
];
export const initialState: Board = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
];

// Functions to solve the puzzle 
function solve(board: Board): Board | boolean {
    if (solved(board)) {
        return board;
    } else {
        const possibilities = nextBoards(board);
        const validBoards = keepOnlyValid(possibilities);
        return searchForSolution(validBoards);
    }
}

function searchForSolution(boards: Board[]): Board | boolean {
    if (boards.length < 1) {
        return false;
    } else {
        let first: Board | undefined = boards.shift();
        const tryPath: Board | boolean = solve(first!);
        if (tryPath) {
            return tryPath;
        } else {
            return searchForSolution(boards);
        }
    }
}

function solved(board: Board): boolean {
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            if (board[i][j] == 0) {
                return false;
            }
        }
    }
    return true;
}

function nextBoards(board: Board): Board[] {
    let res = [];
    const firstEmpty = findEmptySquare(board);
    if (firstEmpty != undefined) {
        const y = firstEmpty[0];
        const x = firstEmpty[1];
        for (let i = 1; i <= 9; i++) {
            let newBoard = [...board];
            let row = [...newBoard[y]];
            row[x] = i;
            newBoard[y] = row;
            res.push(newBoard);
        }
    }
    return res;
}

function findEmptySquare(board: Board): number[] | undefined {
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            if (board[i][j] == 0) {
                return ([i, j]);
            }
        }
    }
}

function keepOnlyValid(boards: Board[]): Board[] {
    let res = [];
    for (let i = 0; i < boards.length; i++) {
        if (validBoard(boards[i])) {
            res.push(boards[i]);
        }
    }
    return res;
}

function validBoard(board: Board): boolean {
    return validRow(board) && validColumn(board) && validSquare(board);
}

function validRow(board: Board) {
    for (let i = 0; i < 9; i++) {
        let cur: number[] = [];
        for (let j = 0; j < 9; j++) {
            if (cur.includes(board[i][j])) {
                return false;
            } else if (board[i][j] != 0) {
                cur.push(board[i][j]);
            }
        }
    }
    return true;
}

function validColumn(board: Board) {
    for (let i = 0; i < 9; i++) {
        let cur: number[] = [];
        for (let j = 0; j < 9; j++) {
            if (cur.includes(board[j][i])) {
                return false;
            } else if (board[j][i] != 0) {
                cur.push(board[j][i]);
            }
        }
    }
    return true;
}

function validSquare(board: Board) {
    const boxCoordinates = [
        [0, 0],
        [0, 1],
        [0, 2],
        [1, 0],
        [1, 1],
        [1, 2],
        [2, 0],
        [2, 1],
        [2, 2],
    ];
    for (var y = 0; y < 9; y += 3) {
        for (var x = 0; x < 9; x += 3) {
            var cur: number[] = [];
            for (var i = 0; i < 9; i++) {
                var coordinates = [...boxCoordinates[i]];
                coordinates[0] += y;
                coordinates[1] += x;
                if (cur.includes(board[coordinates[0]][coordinates[1]])) {
                    return false;
                } else if (board[coordinates[0]][coordinates[1]] != 0) {
                    cur.push(board[coordinates[0]][coordinates[1]]);
                }
            }
        }
    }
    return true;
}

// This is the API function itself. It only accepts the POST method.
export default function (req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "POST") {
        try {
            let parsedString: Board = JSON.parse(req.body.board);
            res.status(200).send({ solution: solve(parsedString) })
        } catch (err) {
            res.status(500).json({ error: "Failed to Load Data" });
        }
    } else if (req.method === "GET") {
        res.status(405).end("Method not allowed, use POST method instead");
    } else {
        res.status(400).end("Bad Request");
    }
}