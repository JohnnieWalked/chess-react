import useChessContext from "../../hooks/use-chess-context";
import "./sidebar.scss";

function SideBar() {

	const {restart} = useChessContext();

	return (
		<div className="sidebar w-80 h-full flex flex-col justify-center text-zinc-400 relative">
			<ul className="sidebar-list ml-5 leading-loose">
				<li>Rotate chessboard</li>
				<li>See move history</li>
				<li onClick={restart}>Restart Game</li>
			</ul>
		</div>
	)
}

export default SideBar;