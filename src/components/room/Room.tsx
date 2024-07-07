import { useParams } from "react-router-dom";
import { useSocketContext } from "../../contexts/socketContext"

const Room = () => {
    const socket = useSocketContext();
    console.log(useParams())
    return (
        <></>
    )
}

export default Room