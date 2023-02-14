import ChessBoard from "./components/chessboard/ChessBoard";
import SideBar from "./components/sideBar/SideBar";

function App() {

	return (
		<div className="w-screen h-screen flex items-center justify-around justify-items-center bg-skyrim-night bg-no-repeat bg-cover">
			<ChessBoard />
			<SideBar />
		</div>
	);
}

export default App;
