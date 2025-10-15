# 🧭 Git 기본 명령어 요약

## 📦 초기 설정
| 명령어 | 설명 |
|--------|------|
| `git config --global user.name "사용자이름"` | 사용자 이름 설정 |
| `git config --global user.email "이메일주소"` | 사용자 이메일 설정 |
| `git config --list` | 설정된 Git 환경 확인 |
| `git init` | 현재 디렉토리를 Git 저장소로 초기화 |

---

## 📁 저장소 연결
| 명령어 | 설명 |
|--------|------|
| `git clone [URL]` | 원격 저장소를 로컬로 복제 |
| `git remote add origin [URL]` | 원격 저장소(origin) 추가 |
| `git remote -v` | 연결된 원격 저장소 확인 |
| `git remote remove origin` | 원격 저장소 연결 해제 |

---

## 📝 변경 관리
| 명령어 | 설명 |
|--------|------|
| `git status` | 현재 변경 사항 확인 |
| `git add [파일명]` | 특정 파일 스테이징 |
| `git add .` | 모든 변경 파일 스테이징 |
| `git commit -m "메시지"` | 커밋 생성 |
| `git commit --amend` | 마지막 커밋 수정 |

---

## 🔄 브랜치 관리
| 명령어 | 설명 |
|--------|------|
| `git branch` | 브랜치 목록 보기 |
| `git branch [브랜치명]` | 새 브랜치 생성 |
| `git checkout [브랜치명]` | 브랜치 전환 |
| `git merge [브랜치명]` | 다른 브랜치 병합 |
| `git branch -d [브랜치명]` | 브랜치 삭제 |

---

## 🌐 원격 저장소
| 명령어 | 설명 |
|--------|------|
| `git push origin [브랜치명]` | 로컬 브랜치를 원격으로 푸시 |
| `git pull origin [브랜치명]` | 원격 저장소의 변경 내용 가져오기 |
| `git fetch` | 원격 저장소의 최신 커밋 정보만 가져오기 |
| `git push -u origin main` | 기본 브랜치 연결 및 푸시 |

---

## 🕐 로그 & 되돌리기
| 명령어 | 설명 |
|--------|------|
| `git log` | 커밋 로그 보기 |
| `git log --oneline` | 간략한 로그 보기 |
| `git diff` | 변경된 내용 비교 |
| `git checkout [파일명]` | 수정된 파일 복구 |
| `git reset --hard [커밋ID]` | 특정 커밋 상태로 되돌리기 |
| `git revert [커밋ID]` | 이전 커밋 되돌리기(기록 남김) |

---

## ⚙️ 기타 유용한 명령어
| 명령어 | 설명 |
|--------|------|
| `git stash` | 임시 저장 |
| `git stash pop` | 임시 저장된 내용 복원 |
| `git tag [태그명]` | 태그 생성 |
| `git show [태그명]` | 태그 정보 확인 |
| `git clean -fd` | 추적되지 않은 파일/폴더 삭제 |

---

## 📚 참고
> 자주 사용하는 명령은 `git status`, `git add .`, `git commit -m "..."`, `git push origin main` 💡
