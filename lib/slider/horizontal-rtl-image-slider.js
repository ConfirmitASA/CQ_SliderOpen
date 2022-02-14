import SliderBase from './slider-base';
import Utils from './utils';
import KEYS from './keyboard-keys';

export default class HorizontalRtlImageSlider extends SliderBase {

	getTrackValueByInterval(interval) {
		if(interval === this.trackIntervals[0]) {
			return 0;
		}
		if(interval === this.trackIntervals[this.trackIntervals.length - 1]) {
			return 100;
		}
		return Utils.floor(((interval[0] + interval[1]) / 2), 2);
	}
	
	setHandleNodePosition(position) {
		this.handleNode.style.right = position;
	}

	getTrackNodeSize() {
		return this.trackNode.offsetWidth;
	}

	getHandleNodeSize() {
		return this.handleNode.offsetWidth;
	}

	getHandleNodeMargin() {
		return Utils.outerWidth(this.handleNode) - this.handleNode.offsetWidth;
	}

	getNoValueNodeOffset() {
		return Utils.getElementOffset(this.noValueNode).left + this.noValueNode.offsetWidth;
	}

	getTrackNodeOffset() {
		return Utils.getElementOffset(this.trackNode).left + this.trackNode.offsetWidth;
	}

	getNoValueHandleNodePosition() {
		return this.getTrackNodeOffset() - (this.getNoValueNodeOffset() + this.getHandleNodeMargin());
	}

	getMouseEventPointerPosition(event) {
		return event.pageX;
	}

	getTouchEventPointerPosition(event) {
		return event.changedTouches[0].pageX;
	}

	getPointerPositionOnTheTrack(pointerPosition) {
		return this.getTrackNodeOffset() - pointerPosition;
	}

	handleArrowsKeys(keyCode) {
		switch (keyCode) {
			case KEYS.ArrowDown:
			case KEYS.ArrowRight:
				this.moveHandleBack();
				break;
			case KEYS.ArrowUp:
			case KEYS.ArrowLeft:
				this.moveHandleForward();
				break;
		}
	}
}