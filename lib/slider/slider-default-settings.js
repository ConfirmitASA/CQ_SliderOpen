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
    },
    otherSettings: {
        useImageSlider: false,
        imageSize: 80,
        handleImage: '',
        endImage: '',
        leftLabelText: {},
        rightLabelText: {}
    }
}

export {
    DEFAULT_SLIDER_SETTINGS
}