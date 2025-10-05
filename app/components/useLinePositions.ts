import { useEffect, useState } from "react";

export default function useLinePositions(
  fontLoaded: boolean,
  textRefs: React.MutableRefObject<(HTMLParagraphElement | null)[]>,
  text: string,
  fontSize: number,
  repetitions: number
) {
  const [positions, setPositions] = useState<any[]>([]);

  const getLineRects = (element: HTMLElement) => {
    const range = document.createRange();
    const textNode = element.firstChild;
    if (!textNode || textNode.nodeType !== Node.TEXT_NODE) return [];
    const words = textNode.textContent?.split(" ") ?? [];
    const lines: any[] = [];
    let currentIndex = 0;
    let currentLine: any = null;

    for (let word of words) {
      range.setStart(textNode, currentIndex);
      range.setEnd(textNode, currentIndex + word.length);
      const rects = range.getClientRects();
      if (rects.length > 0) {
        const rect = rects[0];
        if (!currentLine || Math.abs(rect.top - currentLine.top) > 5) {
          if (currentLine) lines.push(currentLine);
          currentLine = {
            top: rect.top,
            bottom: rect.bottom,
            height: rect.height,
          };
        } else {
          currentLine.bottom = Math.max(currentLine.bottom, rect.bottom);
        }
      }
      currentIndex += word.length + 1;
    }
    if (currentLine) lines.push(currentLine);
    return lines;
  };

  const updateLinePositions = () => {
    const newPositions = textRefs.current.slice(0, repetitions).map((ref) => {
      if (!ref) return null;
      const parentRect = ref.parentElement!.getBoundingClientRect();
      const lineRects = getLineRects(ref);
      return lineRects.map((rect) => ({
        top: rect.top - parentRect.top,
        bottom: rect.bottom - parentRect.top,
        height: rect.height,
      }));
    });
    setPositions(newPositions);
  };

  useEffect(() => {
    if (fontLoaded) {
      const timeout = setTimeout(updateLinePositions, 200);
      return () => clearTimeout(timeout);
    }
  }, [fontLoaded, text, fontSize, repetitions]);

  return positions;
}
