import {reactive} from "vue";

interface IMotion {
    opacity: number;
    filter: string;
    y?: number;

    [key: string]: any;
}

interface IMotionOption {
    initial: IMotion;
    enter: IMotion;
    leave: IMotion;
}

export default function () {
    const fadeIn = reactive<IMotionOption>({
        initial: {
            opacity: 0,
            filter: "blur(20px)"
        },
        enter: {
            opacity: 1,
            filter: "blur(0px)"
        },
        leave: {
            opacity: 0,
            filter: "blur(20px)"
        }
    })
    const scaleIn = reactive<IMotionOption>({
        initial: {
            opacity: 0,
            filter: "blur(20px)",
            transform: "scale(0)"
        },
        enter: {
            opacity: 1,
            filter: "blur(0px)",
            transform: "scale(1)"
        },
        leave: {
            opacity: 0,
            filter: "blur(20px)",
            transform: "scale(0.5)"
        }
    })
    const slideDown = reactive<IMotionOption>({
        initial: {
            opacity: 0,
            filter: "blur(20px)",
            x: 480
        },
        enter: {
            opacity: 1,
            filter: "blur(0px)",
            x: 0
        },
        leave: {
            opacity: 0,
            filter: "blur(20px)",
            y: -40
        }
    })
    return {
        fadeIn,
        scaleIn,
        slideDown
    }
}