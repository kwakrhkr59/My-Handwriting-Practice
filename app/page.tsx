"use client";

import { useState, useRef } from "react";
import { Printer } from "lucide-react";
import SettingsPanel from "./components/SettingsPanel";
import PracticeSheet from "./components/PracticeSheet";
import { lineStyles } from "./components/LineStyles";
import { textColors } from "./components/TextColors";
import useFontLoader from "./components/useFontLoader";
import useLinePositions from "./components/useLinePositions";

export default function HandwritingPractice() {
  const [text, setText] = useState(
    "The quick brown fox jumps over the lazy dog."
  );
  const [repetitions, setRepetitions] = useState(4);
  const [fontSize, setFontSize] = useState(24);
  const [textOpacity, setTextOpacity] = useState(10);
  const [lineStyle, setLineStyle] = useState("classic");
  const [textColor, setTextColor] = useState("#1f2937");
  const [showSettings, setShowSettings] = useState(true);

  const pdfRef = useRef<HTMLDivElement>(null);
  const textRefs = useRef<(HTMLParagraphElement | null)[]>([]);

  const fontLoaded = useFontLoader(
    "https://fonts.googleapis.com/css2?family=Allura&display=swap"
  );
  const linePositions = useLinePositions(
    fontLoaded,
    textRefs,
    text,
    fontSize,
    repetitions
  );

  const printPage = () => {
    setShowSettings(false);
    setTimeout(() => {
      window.print();
      setShowSettings(true);
    }, 100);
  };

  const currentLineStyle = lineStyles[lineStyle];

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4 md:p-8 print:bg-white print:p-0">
      <style jsx global>{`
        @media screen {
          .practice-container {
            width: 210mm;
            min-height: 297mm;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            border: 1px solid #e5e7eb;
          }
        }
        @media print {
          .no-print {
            display: none !important;
          }
          main {
            padding: 0 !important;
            background: white !important;
          }
          body {
            background: white !important;
          }
          .practice-container {
            max-width: 100% !important;
            border: none !important;
            box-shadow: none !important;
            padding: 20px !important;
            width: 210mm;
            min-height: 297mm;
          }
        }
      `}</style>

      <div className="max-w-6xl mx-auto">
        <div className="no-print mb-8 text-center">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
            ✍️ Handwriting Practice Generator
          </h1>
          <p className="text-gray-600">
            Create custom practice sheets with your preferred style
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {showSettings && (
            <div className="no-print lg:w-1/3">
              <SettingsPanel
                text={text}
                setText={setText}
                repetitions={repetitions}
                setRepetitions={setRepetitions}
                fontSize={fontSize}
                setFontSize={setFontSize}
                textOpacity={textOpacity}
                setTextOpacity={setTextOpacity}
                lineStyle={lineStyle}
                setLineStyle={setLineStyle}
                textColor={textColor}
                setTextColor={setTextColor}
                fontLoaded={fontLoaded}
                printPage={printPage}
              />
            </div>
          )}

          <div className={`${showSettings ? "lg:w-2/3" : "w-full"}`}>
            <PracticeSheet
              pdfRef={pdfRef}
              textRefs={textRefs}
              text={text}
              repetitions={repetitions}
              fontSize={fontSize}
              textOpacity={textOpacity}
              textColor={textColor}
              linePositions={linePositions}
              currentLineStyle={currentLineStyle}
            />
          </div>
        </div>
      </div>
    </main>
  );
}
