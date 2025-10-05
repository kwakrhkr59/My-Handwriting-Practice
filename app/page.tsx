"use client";

import { useState, useRef, useEffect } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export default function HandwritingPractice() {
  const [text, setText] = useState(
    "The quick brown fox jumps over the lazy dog."
  );
  const [fontLoaded, setFontLoaded] = useState(false);
  const pdfRef = useRef(null);

  // Google Font 로드
  useEffect(() => {
    const link = document.createElement("link");
    link.href = "https://fonts.googleapis.com/css2?family=Allura&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);

    // 폰트 로딩 완료 대기
    if (document.fonts) {
      document.fonts.ready.then(() => {
        setFontLoaded(true);
      });
    } else {
      // 폴백: 일정 시간 대기
      setTimeout(() => setFontLoaded(true), 1000);
    }

    return () => {
      document.head.removeChild(link);
    };
  }, []);

  const generatePDF = async () => {
    const input = pdfRef.current;
    if (!input) return;

    // 폰트 로딩 대기
    if (document.fonts) {
      await document.fonts.ready;
    }

    // 약간의 추가 대기 시간
    await new Promise((resolve) => setTimeout(resolve, 100));

    html2canvas(input, {
      scale: 2,
      useCORS: true,
      logging: false,
    }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const imgWidth = pdf.internal.pageSize.getWidth();
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
      pdf.save("handwriting_practice.pdf");
    });
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-8 bg-gray-50">
      <h1 className="text-3xl font-bold mb-6">
        ✍️ Handwriting Practice Generator
      </h1>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={3}
        className="w-full max-w-lg p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Enter your text here..."
      />
      <button
        onClick={generatePDF}
        className="mt-4 px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
        disabled={!fontLoaded}
      >
        {fontLoaded ? "Generate PDF" : "Loading Font..."}
      </button>

      <div
        ref={pdfRef}
        className="mt-10 w-full max-w-lg border-t border-gray-300 pt-6 bg-white p-8"
        style={{ fontFamily: "Allura, cursive" }}
      >
        <h2
          className="text-xl font-semibold mb-4"
          style={{ fontFamily: "sans-serif" }}
        >
          Preview
        </h2>
        <div className="relative">
          <div className="space-y-8">
            {[...Array(4)].map((_, idx) => (
              <div
                key={idx}
                className="relative h-24 border-b-2 border-gray-400"
              >
                {/* 가이드라인 */}
                <div className="absolute inset-0 flex flex-col">
                  <div className="h-1/3 border-b border-gray-200"></div>
                  <div className="h-1/3 border-b border-dashed border-gray-300"></div>
                  <div className="h-1/3"></div>
                </div>
                {/* 글씨 */}
                <div className="absolute inset-0 flex items-center justify-start pl-2">
                  <p
                    className="text-3xl"
                    style={{
                      fontFamily: "Allura, cursive",
                      lineHeight: "6rem",
                      transform: "translateY(-0.5rem)",
                    }}
                  >
                    {text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
