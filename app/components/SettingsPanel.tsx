"use client";

import { Palette, Type, Hash, Printer } from "lucide-react";
import { lineStyles } from "./LineStyles";
import { textColors } from "./TextColors";

export default function SettingsPanel({
  text,
  setText,
  repetitions,
  setRepetitions,
  fontSize,
  setFontSize,
  textOpacity,
  setTextOpacity,
  lineStyle,
  setLineStyle,
  textColor,
  setTextColor,
  fontLoaded,
  printPage,
}: any) {
  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 space-y-6">
      <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
        <Palette className="w-5 h-5" /> Customization
      </h2>

      {/* Practice Text */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Practice Text
        </label>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={3}
          className="w-full p-3 border border-gray-200 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
          placeholder="Enter your text here..."
        />
      </div>

      {/* Repetitions */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
          <Hash className="w-4 h-4" /> Repetitions: {repetitions}
        </label>
        <input
          type="range"
          min="1"
          max="10"
          value={repetitions}
          onChange={(e) => setRepetitions(Number(e.target.value))}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
        />
      </div>

      {/* Font Size */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
          <Type className="w-4 h-4" /> Font Size: {fontSize}px
        </label>
        <input
          type="range"
          min="16"
          max="36"
          value={fontSize}
          onChange={(e) => setFontSize(Number(e.target.value))}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
        />
      </div>

      {/* Text Opacity */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
          <Type className="w-4 h-4" /> Text Opacity: {textOpacity}%
        </label>
        <input
          type="range"
          min="0"
          max="100"
          value={textOpacity}
          onChange={(e) => setTextOpacity(Number(e.target.value))}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
        />
      </div>

      {/* Line Style */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Line Style
        </label>
        <div className="grid grid-cols-2 gap-2">
          {Object.entries(lineStyles).map(([key, style]) => (
            <button
              key={key}
              onClick={() => setLineStyle(key)}
              className={`p-3 rounded-lg border-2 ${
                lineStyle === key
                  ? "border-blue-500 bg-blue-50"
                  : "border-gray-200"
              }`}
            >
              <div className="flex items-center gap-2">
                <div
                  className="w-4 h-4 rounded"
                  style={{ backgroundColor: style.main }}
                />
                <span className="text-sm">{style.name}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Text Color */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Text Color
        </label>
        <div className="grid grid-cols-3 gap-2">
          {textColors.map((color) => (
            <button
              key={color.value}
              onClick={() => setTextColor(color.value)}
              className={`p-2 rounded-lg border-2 ${
                textColor === color.value
                  ? "border-blue-500 bg-blue-50"
                  : "border-gray-200"
              }`}
              title={color.name}
            >
              <div className="flex items-center gap-2">
                <div
                  className="w-4 h-4 rounded"
                  style={{ backgroundColor: color.value }}
                />
                <span className="text-sm">{color.name}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Print */}
      <button
        onClick={printPage}
        disabled={!fontLoaded}
        className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
      >
        <Printer className="w-5 h-5" />
        {fontLoaded ? "Print / Save as PDF" : "Loading Font..."}
      </button>
    </div>
  );
}
