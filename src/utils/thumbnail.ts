import html2canvas from 'html2canvas';

export async function emailTemplateThumbnail(type: 'mobile' | 'desktop', html: string) {
  // Create an iframe element

  const iframe = document.createElement('iframe');
  iframe.style.position = 'absolute';
  iframe.style.left = '-9999px';
  iframe.style.top = '-9999px';
  iframe.style.width = type === 'mobile' ? '320px' : '1080px';
  iframe.style.height = 'auto';
  iframe.style.border = 'none';
  iframe.style.padding = '0px';

  document.body.appendChild(iframe);

  // Set the iframe content
  const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document;
  if (iframeDoc) {
    iframeDoc.open();
    iframeDoc.write(html);
    iframeDoc.close();
  }

  // Wait for the iframe to load fully before capturing
  await new Promise((resolve) => {
    iframe.onload = resolve;
  });

  try {
    const canvas = await html2canvas(iframe.contentWindow!.document.body, {
      useCORS: true,
      allowTaint: false,
      windowWidth: type === 'mobile' ? 320 : 1080,
      onclone: (doc) => {
        const images = Array.from(doc.querySelectorAll('img'));

        images.forEach(async (img) => {
          const src = img.getAttribute('src') || '';

          // Fetch the image to avoid CORS issue
          try {
            await fetch(src, { cache: 'no-cache', method: 'GET' });
          } catch {
            console.error('Error fetching image:');
          }
        });
      },
    });

    const image = canvas.toDataURL('image/png');
    document.body.removeChild(iframe); // Remove the iframe after capturing

    return image;
  } catch (error) {
    console.error('Error capturing the iframe:', error);
    document.body.removeChild(iframe); // Clean up in case of error
    throw error;
  }
}
