# 폰트 파일 안내

이 폴더에는 Paperlogy 폰트 파일들이 필요합니다.

## 필수 폰트 파일 목록

1. `Paperlogy-1Thin.ttf` - 얇은 굵기 (100)
2. `Paperlogy-2ExtraLight.ttf` - 매우 가벼운 굵기 (200)
3. `Paperlogy-3Light.ttf` - 가벼운 굵기 (300)
4. `Paperlogy-4Regular.ttf` - 보통 굵기 (400) ⭐ 가장 많이 사용
5. `Paperlogy-5Medium.ttf` - 중간 굵기 (500)
6. `Paperlogy-6SemiBold.ttf` - 세미볼드 (600)
7. `Paperlogy-7Bold.ttf` - 볼드 (700) ⭐ 제목에 사용
8. `Paperlogy-8ExtraBold.ttf` - 엑스트라볼드 (800)
9. `Paperlogy-9Black.ttf` - 블랙 (900)

---

## 폰트가 없는 경우

### 대체 폰트 사용

Paperlogy 폰트가 없는 경우, 다음 무료 한글 폰트로 대체 가능합니다:

#### 1. Pretendard (추천)
```css
@import url('https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendard.css');

body {
    font-family: 'Pretendard', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
}
```

#### 2. Noto Sans KR
```css
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@300;400;500;600;700&display=swap');

body {
    font-family: 'Noto Sans KR', sans-serif;
}
```

#### 3. SUIT
```css
@import url('https://cdn.jsdelivr.net/gh/sunn-us/SUIT/fonts/static/woff2/SUIT.css');

body {
    font-family: 'SUIT', sans-serif;
}
```

---

## styles.css 수정 방법

폰트를 대체하려면 `styles.css` 파일의 상단 `@font-face` 선언 부분을 제거하고,
위의 `@import` 구문을 추가한 후 `font-family`를 수정하세요.

### 예시:
```css
/* 기존 @font-face 선언 삭제 */

/* 새로운 폰트 추가 */
@import url('https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendard.css');

body {
    font-family: 'Pretendard', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    /* ... */
}
```

---

## Paperlogy 폰트 구입

Paperlogy 폰트는 상업용 라이선스가 필요할 수 있습니다.
공식 제공처에서 라이선스를 확인하고 구입하세요.

---

## 라이선스 주의사항

- 무료 폰트의 경우에도 라이선스를 반드시 확인하세요
- 상업적 사용 시 라이선스 구입이 필요할 수 있습니다
- 폰트 파일을 재배포하지 마세요
