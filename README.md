# frontend-quiz

모바일(출퇴근) 학습용 프론트엔드 퀴즈 웹앱입니다.

- Framework: Next.js (App Router)
- Language: TypeScript
- Package manager: Yarn

## 프로젝트 소개

`frontend-quiz`는 프론트엔드 기술 면접/학습 문제를 모바일에서 빠르게 반복 학습하기 위한 웹앱입니다.

- 문제는 JSON 파일(`public/quizzes/*.json`)로 관리되어 손쉽게 확장할 수 있습니다.
- 한 번에 한 문제씩 카드 형태로 보여주며, 답안은 버튼으로 토글해 확인합니다.
- 카드 좌우 스와이프 제스처로 다음/이전 문제를 이동할 수 있습니다.
- 문제 순서는 로드 시 랜덤으로 섞여 반복 학습에 적합합니다.

## 1) 로컬 실행

```bash
yarn install
yarn dev
```

- 브라우저: `http://localhost:3000`

## 2) 퀴즈 JSON 파일 위치

퀴즈 데이터는 아래 경로에 넣으면 됩니다.

- `public/quizzes/*.json`

예: `public/quizzes/javascript.json`

정적 파일이므로 클라이언트에서 `/quizzes/javascript.json` 경로로 불러올 수 있습니다.

## 3) 스크립트

```bash
yarn dev
yarn build
yarn start
yarn lint
yarn typecheck
```

## 4) 배포

### Vercel

기본 설정 그대로 배포하면 됩니다.

### GitHub Pages

이 프로젝트는 GitHub Pages용 정적 export를 지원하도록 설정되어 있습니다.

필수 환경변수:

- `NEXT_PUBLIC_DEPLOY_TARGET=github-pages`
- `NEXT_PUBLIC_GITHUB_REPO=<repo-name>`

예를 들어 저장소가 `https://github.com/<user>/frontend-quiz` 라면 `<repo-name>`은 `frontend-quiz` 입니다.

이 값이 설정되면 `next.config.ts`에서 아래를 자동 적용합니다.

- `output: "export"`
- `basePath` / `assetPrefix`
- `images.unoptimized: true`
