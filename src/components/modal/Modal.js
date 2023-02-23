

const Modal = ({children}) => {

    return (
        <div className="modal h-1/2 absolute flex flex-col justify-center items-center self-center text-zinc-400 text-center">
            {children}
        </div>
    )
}

export default Modal;