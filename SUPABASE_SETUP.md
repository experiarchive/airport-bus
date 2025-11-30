# 🚀 Supabase 설정 가이드

이 문서는 "실시간 여행자 톡" 기능을 활성화하기 위한 Supabase 설정 방법을 설명합니다.
모든 과정은 무료이며, 약 5~10분 정도 소요됩니다.

## 1단계: 프로젝트 생성
1. [Supabase.com](https://supabase.com)에 접속하여 로그인합니다.
2. **"New Project"** 버튼을 클릭합니다.
3. 프로젝트 정보를 입력합니다:
   - **Name**: `airport-bus` (원하는 이름)
   - **Database Password**: 강력한 비밀번호 생성 후 **꼭 기억해두세요**.
   - **Region**: `Seoul` (Korea) 선택 (속도를 위해 필수).
   - **Pricing Plan**: `Free` 선택.
4. **"Create new project"** 클릭 (생성까지 1~2분 걸립니다).

## 2단계: 테이블 생성 (Messages)
1. 왼쪽 메뉴에서 **Table Editor** (표 아이콘)를 클릭합니다.
2. **"Create a new table"** 버튼을 클릭합니다.
3. 다음과 같이 설정합니다:
   - **Name**: `messages`
   - **Description**: (비워도 됨)
   - **Enable Row Level Security (RLS)**: ✅ 체크 (보안을 위해 권장)
   - **Enable Realtime**: ✅ **필수 체크!** (이걸 체크해야 실시간 채팅이 됩니다)
4. **Columns** (열) 추가:
   - `id`: `int8` / Primary Key (기본값 유지)
   - `created_at`: `timestamptz` / Default: `now()` (기본값 유지)
   - `nickname`: `text` (새로 추가)
   - `content`: `text` (새로 추가)
   - `bus_no`: `text` (새로 추가)
   - `direction`: `text` (새로 추가)
5. **Save** 클릭.

## 3단계: 권한 설정 (Policies)
누구나 글을 쓰고 읽을 수 있도록 권한을 엽니다.
1. **Table Editor**에서 `messages` 테이블이 선택된 상태에서, 상단의 **"No active RLS policies"** (또는 Policies 탭) 클릭.
2. **"New Policy"** 클릭 -> **"Get started quickly"** -> **"Enable read access to everyone"** 선택 -> **"Use this template"** 클릭.
   - **Review** -> **Save policy** 클릭. (누구나 읽기 가능)
3. 다시 **"New Policy"** 클릭 -> **"Get started quickly"** -> **"Enable insert access to everyone"** 선택 -> **"Use this template"** 클릭.
   - **Review** -> **Save policy** 클릭. (누구나 쓰기 가능)

## 4단계: API 키 연결
1. 왼쪽 메뉴 하단의 **Project Settings** (톱니바퀴 아이콘) 클릭.
2. **API** 메뉴 클릭.
3. `Project URL`과 `Project API keys` (anon, public)을 확인합니다.
4. 프로젝트 폴더의 `.env.local` 파일을 생성(또는 열기)하고 아래와 같이 입력합니다:

```env
NEXT_PUBLIC_SUPABASE_URL=여기에_Project_URL_붙여넣기
NEXT_PUBLIC_SUPABASE_ANON_KEY=여기에_anon_public_key_붙여넣기
```

5. 저장 후 서버를 재시작(`npm run dev`를 껐다 켜기)하면 완료!
