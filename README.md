# frontend-quiz

모바일(출퇴근) 학습용 프론트엔드 퀴즈 웹앱 초기 템플릿입니다.

- Framework: Next.js (App Router)
- Language: TypeScript
- Package manager: Yarn

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

## 5) 다음 작업

JSON 구조를 주시면 타입(`type`) 정의와 퀴즈 화면(문항/정답 체크/진도 저장)까지 바로 연결하겠습니다.
