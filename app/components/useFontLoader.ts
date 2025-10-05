import { useEffect, useState } from "react";

export default function useFontLoader(fontUrl: string) {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const link = document.createElement("link");
    link.href = fontUrl;
    link.rel = "stylesheet";
    document.head.appendChild(link);

    if (document.fonts) {
      document.fonts.ready.then(() => setLoaded(true));
    } else {
      setTimeout(() => setLoaded(true), 1000);
    }

    return () => {
      document.head.removeChild(link);
    };
  }, [fontUrl]);

  return loaded;
}
