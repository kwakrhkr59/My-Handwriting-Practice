"use client";

export default function PracticeSheet({
  pdfRef,
  textRefs,
  text,
  repetitions,
  fontSize,
  textOpacity,
  textColor,
  linePositions,
  currentLineStyle,
}: any) {
  return (
    <div
      ref={pdfRef}
      className="practice-container bg-white rounded-2xl shadow-xl p-8"
      style={{ fontFamily: "Allura, cursive" }}
    >
      <div className="space-y-12">
        {[...Array(repetitions)].map((_, idx) => (
          <div key={idx} className="relative" style={{ minHeight: "60px" }}>
            <p
              ref={(el) => (textRefs.current[idx] = el)}
              style={{
                margin: 0,
                fontSize: `${fontSize}px`,
                color: textColor,
                opacity: `${100 - textOpacity}%`,
                lineHeight: 1.8,
              }}
            >
              {text}
            </p>
            {linePositions[idx]?.map((line: any, i: number) => (
              <div key={i}>
                <div
                  className="absolute left-0 right-0"
                  style={{
                    top: `${line.top}px`,
                    borderTop: `${currentLineStyle.thickness}px solid ${currentLineStyle.main}`,
                  }}
                />
                <div
                  className="absolute left-0 right-0"
                  style={{
                    top: `${line.top + line.height / 3}px`,
                    borderTop: `1px solid ${currentLineStyle.guide}`,
                  }}
                />
                <div
                  className="absolute left-0 right-0"
                  style={{
                    top: `${line.top + (line.height * 2) / 3}px`,
                    borderTop: `${currentLineStyle.thickness}px solid ${currentLineStyle.main}`,
                  }}
                />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
