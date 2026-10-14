export const normalizeCoordinates = (x, y, width, height) => {
  return {
    normX: x / width,
    normY: y / height,
  };
};

export const denormalizeCoordinates = (normX, normY, width, height) => {
  return {
    x: normX * width,
    y: normY * height,
  };
};