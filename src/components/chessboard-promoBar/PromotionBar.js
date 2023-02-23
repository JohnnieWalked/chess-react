import Piece from "react-chess-pieces";
import './promotionBar.scss';

/* responsible for showing a promotion bar */
const PromotionBar = ({getPromotedPiece, order}) => {
    let pieces = ['R', 'N', 'B', 'Q'];
    if (!order) pieces = pieces.map(item => item.toLowerCase());

    const renderItems = pieces.map((item, i) => {
        return (
            <div onClick={(e) => getPromotedPiece(e)} className={`w-16 h-14 ${pieces[0] === 'r' ? 'hover:bg-zinc-300 rounded-xl' : 'hover:bg-zinc-900 rounded-xl'}`} key={i}>
                <span className="hidden">{item}</span>
                <Piece piece={item} />
            </div>
        )
    })

    return (
        <div className="promotionBar absolute z-10 w-full flex flex-col justify-center items-center self-center text-[1.2rem] text-center text-sky-50 mt-3 mb-3">
            <div>Pawn Promotion Bar</div>
            <div className={`w-full h-14 flex items-center justify-center bg-skyrim-bar bg-contain bg-center bg-no-repeat`}>
                {renderItems}
            </div>
        </div>
    )
}

export default PromotionBar;