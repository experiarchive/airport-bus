# 🕒 시간표 업데이트 가이드

버스 시간표가 바뀌었을 때 업데이트하는 방법입니다.

## 1단계: CSV 파일 수정
`data/csv` 폴더 안에 있는 엑셀(CSV) 파일들을 수정합니다.
*   새로운 노선이 생기면 파일을 새로 만드세요.
*   파일 이름 규칙: `버스번호_방향.csv` (예: `6001_Dongdaemun.csv`)

## 2단계: 변환 명령어 실행
터미널에 아래 명령어를 입력하면, CSV 파일들이 웹사이트용 데이터(`timetable.ts`)로 자동 변환됩니다.

```bash
npm run update-timetable
```

## 3단계: 배포하기
변경된 내용을 저장하고 배포합니다.

```bash
git add .
git commit -m "Update timetable"
git push
```

끝! 1~2분 뒤에 사이트에 반영됩니다.
