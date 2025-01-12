import SelectorUser from "./SelectorUser"
import OptionsUser from "./OptionsUser"

import SelectorCompany from "./SelectorCompany"
import OptionsCompany from "./OptionsCompany"

export default function Holder() {
    return (
        <div className="w-screen h-[87.5vh] flex flex-row overflow-y-hidden relative">
            {/* <SelectorUser />
            <OptionsUser /> */}

            <SelectorCompany />
            <OptionsCompany />
        </div>
    )
}