---
name: PDF 뷰어 구현
about: PDF 뷰어 컴포넌트 구현 및 최적화
title: "Feat: PDF 뷰어 구현"
labels: feat
assignees: ""
---

## Description

### 현재 상황

- PDF 뷰어가 CDN에 의존적
- 개발 환경에서만 동작하는 상태
- 기본적인 PDF 렌더링 기능 구현 필요

### 구현 내용

- PDF 뷰어 컴포넌트 구현
- 페이지 이동, 확대/축소 기능
- 반응형 디자인 적용

## To-do

- [x] PDF.js 기본 설정
- [x] 문서 뷰어 컴포넌트 구현
- [x] 페이지 네비게이션 기능
- [x] 확대/축소 기능
- [ ] AWS S3 + CloudFront 연동 (추후 구현)

## 기술 스택

- react-pdf
- PDF.js
- Next.js

## 참고사항

- 현재는 개발 환경용 임시 설정 사용
- 실제 서비스 배포 시 AWS 인프라 활용 예정
