
import "./sidebar.css";

function SideBar() {




  return (
    <div className="sidebar w-80 h-full flex flex-col justify-center text-zinc-400 relative">
        <ul className="sidebar-list text-[1.6rem] ml-5 leading-loose">
            <li>Rotate chessboard</li>
            <li>See move history</li>
            <li>Music</li>
        </ul>
    </div>
  )
}

export default SideBar;