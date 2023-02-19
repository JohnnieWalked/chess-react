
import "./sidebar.scss";

function SideBar({ children }) {


	return (
		<div className="sidebar h-full flex flex-col justify-center text-zinc-400 relative">
			{children}
		</div>
	)
}

export default SideBar;