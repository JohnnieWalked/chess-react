import { useContext } from "react";
import ChessContext from "../context/chess";

function useChessContext() {
    return useContext(ChessContext);
}

export default useChessContext;