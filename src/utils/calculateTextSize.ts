/**
 * 
 */
// export default (text: string, fontSize: number, fontFamily: string, fontStyle: string): { width?: number, height?: number } => {
//   const ctx = canvas?.getContext('2d');
//   let width, height;
//   if (ctx) {
//     ctx.font = `${fontSize}px ${fontStyle} ${fontFamily}`;
//     const textMetrics = ctx.measureText(text);
//     if (textMetrics) {
//       width = textMetrics.width;
//       height = textMetrics.actualBoundingBoxAscent + textMetrics.actualBoundingBoxDescent;
//     }
//   }
//   return { width, height }
// }
export default (text: string, fontSize: number, fontFamily: string, fontStyle: string): { width?: number, height?: number } => {
  const weight = fontStyle.includes('bold') ? 'bold' : 'normal';
  const style = fontStyle.includes('italic') ? 'italic' : 'normal';
  const p = document.createElement('p');
  p.appendChild(document.createTextNode(text));
  Object.assign(p.style, {
    font: fontFamily,
    fontFamily,
    fontSize: fontSize.toString(),
    fontWeight: weight,
    fontStyle: style,
    margin: '0',
    padding: '0',
    border: '0',
    whiteSpace: 'nowrap',
    // color: 'transparent',
    // visibility: 'hidden'
  });
  document.body.appendChild(p);
  const { width, height } = p.getBoundingClientRect();
  p.remove();
  return { width, height };
}
