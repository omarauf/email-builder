import React, { useEffect } from 'react';

export function ShadowComponent({ html }: { html: string }) {
  const hostRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (hostRef.current && !hostRef.current.shadowRoot) {
      const shadowRoot = hostRef.current.attachShadow({ mode: 'open' });

      const htmlElement = document.createElement('html');
      htmlElement.innerHTML = html;

      shadowRoot.appendChild(htmlElement);
    }
  }, [html]);

  return <div ref={hostRef} style={{ width: '320px' }} />;
}
