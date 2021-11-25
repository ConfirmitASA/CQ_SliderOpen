import {SLIDER_DIRECTION} from "./constants";

const DEFAULT_SLIDER_SETTINGS = {
    direction: SLIDER_DIRECTION.horizontal,
    isQuestionValue: true,
    isCustomScale: true,
    containerSize: 600,
    customScale: {
        min: -10,
        max: 10,
        start: '',
        step: 1
    }
}

export {
    DEFAULT_SLIDER_SETTINGS
}