export function transformLowerToUpper(str: string) {
  const asciiCode = str.charCodeAt(0);
  if (asciiCode >= 97 && asciiCode <= 122) {
    const updatedAsciiCode = asciiCode - 32;
    return String.fromCharCode(updatedAsciiCode);
  } else {
    return str;
  }
}
