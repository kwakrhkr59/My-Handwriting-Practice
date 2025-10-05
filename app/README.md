# Handwriting Practice Generator

이 프로젝트는 입력한 텍스트를 예쁜 필기체로 변환하여 손글씨 연습용 PDF/프린트 시트를 생성할 수 있는 Next.js 기반 웹 애플리케이션입니다.

## 주요 기능

- 커스텀 텍스트 입력 및 반복 횟수 지정
- 다양한 줄 스타일(Line Style) 및 텍스트 색상 선택
- 폰트 크기, 투명도 조절
- 프린트 및 PDF 저장 지원
- 반응형 UI

## 설치 및 실행

```sh
git clone https://github.com/your-username/your-repo.git
cd your-repo
npm install
npm run dev
```

브라우저에서 `http://localhost:3000`으로 접속하세요.

## 사용법

1. **Practice Text**: 연습할 문장을 입력하세요.
2. **Repetitions**: 시트에 표시할 반복 횟수를 조절하세요.
3. **Font Size / Opacity**: 폰트 크기와 투명도를 조절하세요.
4. **Line Style / Text Color**: 원하는 줄 스타일과 색상을 선택하세요.
5. **Print / Save as PDF**: 폰트가 로드되면 버튼을 눌러 프린트하거나 PDF로 저장하세요.

## 커스터마이징

- **줄 스타일 추가**: [`app/components/LineStyles.ts`](app/components/LineStyles.ts)에서 lineStyles 객체에 새로운 스타일을 추가할 수 있습니다.
- **텍스트 색상 추가**: [`app/components/TextColors.ts`](app/components/TextColors.ts)에서 textColors 배열에 원하는 색상을 추가하세요.
- **폰트 변경**: [`app/globals.css`](app/globals.css) 및 [`app/components/useFontLoader.ts`](app/components/useFontLoader.ts)에서 Google Fonts 링크를 수정하세요.
