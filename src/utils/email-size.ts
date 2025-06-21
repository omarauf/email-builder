export function getEmailSizeInKB(htmlContent: string) {
  // Calculate the raw size of the HTML content in bytes
  const byteSize = new Blob([htmlContent]).size;

  // Convert bytes to kilobytes (KB)
  const sizeInKB = byteSize / 1024;

  return sizeInKB.toFixed(2); // Round to 2 decimal places
}
