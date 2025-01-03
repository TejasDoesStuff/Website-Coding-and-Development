import Selector from "./Selector"
import Options from "./Options"

export default function Holder() {
    return (
        <div className="w-screen h-[87.5vh] flex flex-row overflow-y-hidden relative">
            <Selector />
            <Options />
        </div>
    )
}