/**
  * Conserve aspect ratio of the original region. Useful when shrinking/enlarging
  * images to fit into a certain area.
  *
  * @param srcWidth width of source image.
  * @param srcHeight height of source image.
  * @param maxWidth maximum available width.
  * @param maxHeight maximum available height.
  * @returns An object containing the calculated width and height.
  */
export default (srcWidth: number, srcHeight: number, maxWidth: number, maxHeight: number): { width: number, height: number } => {
  const ratio = Math.min(maxWidth / srcWidth, maxHeight / srcHeight);

  return { width: srcWidth * ratio, height: srcHeight * ratio };
}
