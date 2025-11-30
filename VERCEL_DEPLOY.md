# 🚀 Vercel 배포 가이드

이 문서는 완성된 프로젝트를 **Vercel**을 통해 전 세계에 무료로 배포하는 방법을 설명합니다.

## 0단계: Git 설치하기 (Git이 없는 경우)
1. [Git for Windows 다운로드](https://git-scm.com/download/win) 페이지로 이동합니다.
2. **"Click here to download"**를 눌러 설치 파일을 받습니다.
3. 설치 파일을 실행하고, 계속 **"Next"**만 눌러서 설치를 완료합니다.
4. **중요**: 설치가 끝나면 **VS Code를 완전히 껐다가 다시 켜주세요.** (그래야 Git을 인식합니다)

## 1단계: GitHub에 코드 올리기
(이미 올리셨다면 건너뛰세요)
1. GitHub에 새 리포지토리(Repository)를 만듭니다.
2. VS Code 터미널에서 다음 명령어를 입력하여 코드를 올립니다:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/experiarchive/airport-bus.git
   git push -u origin main
   ```

## 2단계: Vercel 프로젝트 생성
1. [Vercel.com](https://vercel.com)에 접속하여 로그인합니다 (GitHub 계정 추천).
2. **"Add New..."** 버튼 -> **"Project"** 선택.
3. 방금 올린 GitHub 리포지토리 옆의 **"Import"** 버튼 클릭.

## 3단계: 환경 변수 설정 (중요!)
**"Configure Project"** 화면에서 **Environment Variables** 탭을 펼칩니다.
`.env.local` 파일에 있는 내용을 똑같이 복사해서 넣어줍니다.

| Key | Value |
| :--- | :--- |
| `NEXT_PUBLIC_SUPABASE_URL` | (Supabase URL 값) |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | (Supabase Key 값) |

*   하나씩 입력하고 **Add** 버튼을 눌러 추가합니다.

## 4단계: 배포 시작
1. **"Deploy"** 버튼을 클릭합니다.
2. 폭죽이 터지면 배포 성공! 🎉

## 5단계: 도메인 연결 (bus.lintrahub.com)
1. 배포 완료 화면에서 **"Continue to Dashboard"** 클릭.
2. 상단 메뉴 **Settings** -> **Domains** 클릭.
3. 입력창에 `bus.lintrahub.com` 입력 후 **Add** 클릭.
4. Vercel이 보여주는 **CNAME 값**(`cname.vercel-dns.com`)이 가비아 설정과 일치하는지 확인합니다. (이미 하셨다면 초록색 체크가 뜰 겁니다!)

---
**축하합니다! 이제 전 세계 어디서나 `bus.lintrahub.com`으로 접속할 수 있습니다.**
