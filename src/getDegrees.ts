export const getDegrees = (
  startPos: { x: number; y: number },
  mousePos: { x: number; y: number }
) => {
  if (!mousePos) throw new Error("No mousePos");

  if (mousePos.y > startPos.y) {
    if (mousePos.x > startPos.x) {
      const angle = Math.atan(
        Math.abs(mousePos.y - startPos.y) / Math.abs(mousePos.x - startPos.x)
      );

      return angle;
    } else {
      const angle =
        Math.atan(
          Math.abs(mousePos.x - startPos.x) / Math.abs(mousePos.y - startPos.y)
        ) +
        Math.PI / 2;

      return angle;
    }
  } else {
    if (mousePos.x > startPos.x) {
      const angle = -Math.atan(
        Math.abs(mousePos.y - startPos.y) / Math.abs(mousePos.x - startPos.x)
      );

      return angle;
    } else {
      const angle =
        -Math.atan(
          Math.abs(mousePos.x - startPos.x) / Math.abs(mousePos.y - startPos.y)
        ) -
        Math.PI / 2;

      return angle;
    }
  }
};
