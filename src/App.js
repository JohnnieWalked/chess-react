import { useState, useEffect } from "react";
import ChessBoard from "./components/chessboard/ChessBoard";
import useChessContext from "./hooks/use-chess-context";
import avatar from "./assets/img/avatar.png";
import './sass/style.scss';

function App() {
	const {restart, board} = useChessContext();

	const [rotate, setRotate] = useState(false);

	/* enable/disable slide sidebar to show move notations */
	const [showChessNotation, setShowChessNotation] = useState(null);

	/* receives keys of moves notation (e2-e4) */
	const [moves, setMoves] = useState(Object.keys(sessionStorage));

	/* when player select a move from moves notation - set show old board to "TRUE" */
	const [showOldBoard, setShowOldBoard] = useState(false);

	/* responsible for setting a key from sessionStorage and sending it as props to chessBoard.js */
	const [key, setKey] = useState();

	/* responsible for setting an old board from sessionStorage and sending it as props to chessBoard.js */
	const [oldBoard, setOldBoard] = useState();

	/* clears sessionStorage before loading a page */
	useEffect(() => {
		window.addEventListener("beforeunload", sessionStorage.clear());
		window.removeEventListener("beforeunload", sessionStorage.clear());
	  }, []);

	/* takes a board from sessionStorage and updates state */
	const takeValueFromStorage = (value) => {
		let temp = sessionStorage.getItem(value);
		setKey(value);
		setOldBoard(JSON.parse(temp));
		setShowOldBoard(true);
	}

	/* click to rotate a chessboard */
	const onRotate = () => {
		setRotate(!rotate);
	}

	/* take keys of moves history from sessionStorage and parse into a <div "history-inner"></div> */
	useEffect(() => {
		let keys = Object.keys(sessionStorage);
		setMoves(keys.sort((a, b) => {
			if (Number(a.substring(0, 2)) < Number(b.substring(0, 2))) {
				return -1;
			  }
			  if (Number(a.substring(0, 2)) > Number(b.substring(0, 2))) {
				return 1;
			  }
			  return 0;
		}));
	}, [board])

	/* slide sideBar right and reveal move history */
	const onSlideRight = () => {
		setShowChessNotation(!showChessNotation);
		setShowOldBoard(false);
	}

	const renderMoves = moves.map((item, i) => {
		return (
			<div value={item} onClick={(e) => takeValueFromStorage(e.target.attributes.value.nodeValue)} 
				className="history-item" key={i}>
					{item}
			</div>
		)
	}) 

	return (
		<div className="h-screen bg-skyrim-night bg-no-repeat bg-cover">
			<div className="container">

				<div className="app flex items-center justify-around justify-items-center">
					<ChessBoard showOldBoard={showOldBoard} 
							 	oldBoard={oldBoard} 
								coordinates={key} 
								rotate={rotate} 
					/>
					
					<div className={`h-full sidebar ${showChessNotation ? 'sidebar_slide-right' : ''} 
									 h-screen flex flex-col justify-center text-zinc-400 relative`}
						>

						<ul className="sidebar-list ml-5 leading-loose">
							<li className="sidebar-list_item" 
								onClick={onRotate}>
								Rotate chessboard
							</li>
							<li onClick={onSlideRight} 
								className={`sidebar-list_item ${showChessNotation ? 'sidebar-list_item_active' : ''}`}>
								{showChessNotation ? 'Hide move history' : 'Show move history'}
							</li>
							<li className="sidebar-list_item" onClick={restart}>
								Restart game
							</li>
						</ul>

						<div className={
								`history
								${showChessNotation ? 'history_show' : ''} 
								${showChessNotation === false ? 'history_hide' : ''}`}>
							<div className="history-inner">
								{renderMoves}
							</div>
						</div>

					</div>

				</div>
			</div> {/* container */}

			<footer className="footer fixed bottom-0 z-10">
				<div className="flex justify-start w-screen h-full items-center content-center">
					<img src={avatar} alt="avatar" />
					<a href="https://t.me/ineed_a_dollar">Johnnie Walked</a>
				</div>
			</footer>
		</div>
		
		
	);
}

export default App;
