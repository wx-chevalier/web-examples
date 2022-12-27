//By https://codedump.io/share/Fd3DmsM6UAeS/1/creating-a-blob-from-a-base64-string-in-javascript

// Example
// const blob = b64toBlob(b64Data, contentType);
// const blobUrl = URL.createObjectURL(blob);
function b64toBlob(b64Data, contentType, sliceSize) {
  contentType = contentType || '';
  sliceSize = sliceSize || 512;

  const byteCharacters = atob(b64Data);
  const byteArrays = [];

  for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
    const slice = byteCharacters.slice(offset, offset + sliceSize);

    const byteNumbers = new Array(slice.length);
    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);

    byteArrays.push(byteArray);
  }

  const blob = new Blob(byteArrays, { type: contentType });
  return blob;
}

// Example const file = dataURLtoBlob(canvas.toDataURL());
function dataURLtoBlob(dataURL) {
  // Decode the dataURL
  const binary = atob(dataURL.split(',')[1]);

  // Create 8-bit unsigned array
  const array = [];
  for (let i = 0; i < binary.length; i++) {
    array.push(binary.charCodeAt(i));
  }

  // Return our Blob object
  return new Blob([new Uint8Array(array)], { type: 'image/png' });
}
