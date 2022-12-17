// Hooks
import { useState } from "react";

// Function to stringify the board
function encodeParams(params: any): string {
    const encodeBoard = (board: number[][]): string =>
        board.reduce(
            (result: string, row: any, i: number) =>
                result + `%5B${encodeURIComponent(row)}%5D${i === board.length - 1 ? '' : '%2C'}`,
            '',
        );
    return Object.keys(params)
        .map((key) => key + '=' + `%5B${encodeBoard(params[key])}%5D`)
        .join('&');
}

// Custom hook to fetch data
export function useFetch(options: {
    onSuccess: (response: {solution: number[][]}) => void;
    onError?: any;
}) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const get = (currentBoard: number[][]) => {
        setLoading(true);

        fetch("/api/sudoku-solver", {
            cache: 'no-store',
            method: "POST",
            body: encodeParams({ board: currentBoard }),
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        })
            .then((response) => response.json())
            .then((response) => options.onSuccess(response))
            .catch((err) => setError(err))
            .finally(() => {
                setLoading(false);
            });
    };

    return { get, loading, error };
}