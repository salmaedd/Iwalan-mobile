export const _isEmpty = obj => {
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) return false;
  }
  return true;
};

export const pointsCalculator = (price, generosity) => {
  let points = parseInt(((parseFloat(price) / 1.2) * parseFloat(generosity)) / 10);
  points = isNaN(points) ? 0 : points;
  return points;
};

export const capitalize = s => {
  if (typeof s !== 'string') return '';
  return s.charAt(0).toUpperCase() + s.slice(1);
};
