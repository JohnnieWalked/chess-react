import ChessBoard from "./components/ChessBoard";
import SideBar from "./components/SideBar";

function App() {


	return (
		<div className="w-screen h-screen flex justify-around justify-items-center bg-skyrim-night bg-no-repeat bg-cover">
			<ChessBoard />
			<SideBar />
		</div>
	);
}

export default App;
