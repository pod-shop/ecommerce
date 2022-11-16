/**
 * 
 */
export default (src: string | File): Promise<{ width: number, height: number }> => {
  const img = document.createElement('img');

  const promise = new Promise<{ width: number, height: number }>((resolve, reject) => {
    img.onload = () => {
      // Natural size is the actual image size regardless of rendering.
      // The 'normal' `width`/`height` are for the **rendered** size.
      const width = img.naturalWidth;
      const height = img.naturalHeight;

      // Resolve promise with the width and height
      resolve({ width, height });
    };

    // Reject promise on error
    img.onerror = reject;
  });

  // Setting the source makes it start downloading and eventually call `onload`
  img.src = typeof src === 'string' ? src : URL.createObjectURL(src);

  return promise;
}
