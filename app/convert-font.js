const fs = require("fs");

// 폰트 파일 경로 설정
// Allura-Regular.ttf 파일이 이 스크립트 파일과 같은 폴더에 있다고 가정합니다.
const fontPath = "public/fonts/Allura-Regular.ttf";

try {
  // 폰트 파일을 읽어 Base64로 인코딩합니다.
  const fontData = fs.readFileSync(fontPath, { encoding: "base64" });

  // 변환된 데이터를 JavaScript 파일로 저장합니다.
  const outputContent = `export const AlluraFontData = "${fontData}";`;
  fs.writeFileSync("./Allura-Regular-font.js", outputContent);

  console.log(
    "폰트 파일이 Allura-Regular-font.js로 성공적으로 변환되었습니다."
  );
} catch (error) {
  console.error("파일을 읽는 도중 오류가 발생했습니다:", error);
}
