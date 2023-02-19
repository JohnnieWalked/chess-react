import { useState } from "react";
import ChessBoard from "./components/chessboard/ChessBoard";
import SideBar from "./components/sideBar/SideBar";
import useChessContext from "./hooks/use-chess-context";
import avatar from "./img/avatar.png";
import './sass/style.scss';

function App() {
	const {restart} = useChessContext();

	const [rotate, setRotate] = useState(false);

	const onRotate = () => {
		setRotate(!rotate);
	}

	return (
		<div className="h-screen flex flex-col justify-between">
			<div className="container">

				<div className="h-screen flex items-center justify-around justify-items-center">
					<ChessBoard rotate={rotate} />
					<SideBar>
						<ul className="sidebar-list ml-5 leading-loose">
							<li onClick={onRotate}>Rotate chessboard</li>
							<li className="hidden">See move history</li>
							<li onClick={restart}>Restart game</li>
						</ul>
					</SideBar>
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
