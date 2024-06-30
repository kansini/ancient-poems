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
    leave?: IMotion;
}

export default function () {
    const fadeIn = reactive<IMotionOption>({
        initial: {
            opacity: 0,
            filter: "blur(10px)"
        },
        enter: {
            opacity: 1,
            filter: "blur(0px)"
        },
        leave: {
            opacity: 0,
            filter: "blur(10px)"
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
            filter: "blur(8px)",
            y: -100
        },
        enter: {
            opacity: 1,
            filter: "blur(0px)",
            y: 0
        },
        leave: {
            opacity: 0,
            filter: "blur(10px)",
            y: -200
        }
    })
    const slideLeft = reactive<IMotionOption>({
        initial: {
            opacity: 0,
            filter: "blur(8px)",
            x: 200,
            y: -100
        },
        enter: {
            opacity: 1,
            filter: "blur(0px)",
            x: 0,
            y: 0
        },
        leave: {
            opacity: 0,
            filter: "blur(10px)",
            x: 200,
            y: -100,
            'box-shadow': '4px 4px 0 2px rgba(255, 255, 255, .5), 8px 8px 0 2px rgba(255, 255, 255, .2)'
        }
    })
    return {
        fadeIn,
        scaleIn,
        slideDown,
        slideLeft
    }
}