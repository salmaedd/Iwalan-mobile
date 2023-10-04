import { Dimensions, PixelRatio } from 'react-native';

export const WINDOW_WIDTH = Dimensions.get('window').width;
export const WINDOW_HEIGHT = Dimensions.get('window').height;

// console.log('WINDOW_WIDTH', WINDOW_WIDTH);
// console.log('WINDOW_HEIGHT', WINDOW_HEIGHT);

const guidelineBaseWidth = 414;

export const scaleSize = size => (WINDOW_WIDTH / guidelineBaseWidth) * size;

export const scaleFont = size => size * PixelRatio.getFontScale();

function dimensions(top, right = top, bottom = top, left = right, property) {
  let styles = {};

  styles[`${property}Top`] = top;
  styles[`${property}Right`] = right;
  styles[`${property}Bottom`] = bottom;
  styles[`${property}Left`] = left;

  return styles;
}

export function margin(top, right, bottom, left) {
  return dimensions(top, right, bottom, left, 'margin');
}

export function padding(top, right, bottom, left) {
  return dimensions(top, right, bottom, left, 'padding');
}

// boxShadow: 0 6 10 0 rgba(228, 232, 239, 0.45),
export function boxShadow(
  color = 'rgba(228, 232, 239, 0.45)',
  offset = { height: 0, width: 4 },
  radius = 3,
  opacity = 0.1,
  elevation = 2,
) {
  return {
    shadowColor: color,
    shadowOffset: offset,
    shadowOpacity: opacity,
    shadowRadius: radius,
    elevation: elevation,
  };
}
