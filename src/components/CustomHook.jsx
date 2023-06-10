import { useRef } from 'react'
import { useStateProvider } from "../utils/StateProvider";
import { reducerCases } from "../utils/Constants";

export default function CustomHook() {
    const [{ headerBackground, navBackground }, dispatch] =
        useStateProvider();
    const bodyRef = useRef();
    const bodyScrolled = () => {
        bodyRef.current.scrollTop >= 30
            ? dispatch({ type: reducerCases.SET_NAV_BACKGROUND, navBackground: true })
            : dispatch({ type: reducerCases.SET_NAV_BACKGROUND, navBackground: false })
        bodyRef.current.scrollTop >= 268
            ? dispatch({ type: reducerCases.SET_HEADER_BACKGROUND, headerBackground: true })
            : dispatch({ type: reducerCases.SET_HEADER_BACKGROUND, headerBackground: false })
    };
    return {
        headerBackground,
        bodyRef,
        bodyScrolled,
        navBackground
    }
}
