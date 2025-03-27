# 비즈니스캔버스 프론트엔드 개발자 채용 과제

## 실행 방법

```bash
# 의존성 설치
pnpm install

# 개발 서버 실행
pnpm dev
```

## 기술 스택

- 프레임워크: React (TypeScript)
- UI 라이브러리: Ant Design
- 스타일링: Tailwind CSS
  - Ant Design 컴포넌트를 커스터마이징 하기 위해 사용했습니다.
  - CSS Module, 인라인 스타일링 방식도 고려해 보았지만 유틸리티 우선 접근 방식으로 개발 생산성이 높은 Tailwind CSS를 선택했습니다.
- 빌드 도구: Vite
  - ESM 방식으로 코드를 서빙하여 빠른 개발 서버 시작 속도와 HMR을 지원하기 때문에 사용했습니다.
- 패키지 관리자: pnpm
  - 전역적인 패키지 저장소와 하드 링크를 활용한 효율적인 디스크 공간 관리, `dependencies` 필드에 명시한 의존성만 `node_modules` 하위에 설치하여 유령 의존성 문제를 해결하기 때문에 사용했습니다.

## 구현 내용

### 인터페이스 기반 스토리지 추상화

- 인터페이스를 통해 스토리지 서비스를 추상화시켜 구현체를 쉽게 교체할 수 있도록 하였습니다. 추후 다른 스토리지 요구사항이 추가된다면(API 서버 등) 구현체를 추가해 기존 코드를 수정할 필요 없이 유연하게 대응할 수 있습니다.

  - `InMemoryStorage`
    - 메모리에 데이터를 저장하는 구현체
  - `LocalStorage`
    - 브라우저의 `LocalStorage`에 데이터를 저장하는 구현체

### 컴포넌트 분리

- 동일한 UI에 보여지는 데이터만 다른 레코드 추가, 레코드 수정 모달을 구현하기 위해 `MemberModal` 컴포넌트를 따로 분리하였습니다.
  - `MemberModal`의 `initialValues` props의 `null` 여부에 따라 레코드 추가 or 레코드 수정 모달로 동작하도록 구현하였습니다.

## 회고

- 추상화에 대해 많은 고민을 할 수 있었습니다.

  - 특히, 복잡한 구현 세부사항을 추상화하여 사용하기 좋은 UI 컴포넌트로 제공하는 Ant Design을 사용하면서 추상화의 이점을 느낄 수 있었습니다.
  - 하지만 Ant Design과 Tailwind CSS를 함께 사용하는 과정에서 문제가 발생했을 때 두 라이브러리 모두 세부적인 구현을 확인하기 힘들어 문제 해결에 시간이 오래 걸리는 경험을 하면서 추상화의 단점에 대해서도 확인할 수 있었습니다.

- CSS 라이브러리를 2개 이상 사용하는 것은 좋지 않다는 것을 배웠습니다.

  - Ant Design과 Tailwind CSS를 함께 사용하는 과정에서 두 라이브러리의 CSS 우선 순위 충돌로 스타일이 깨지는 문제가 있었는데 원인 파악도 어렵고 예상하지 못한 동작이 많아 CSS 라이브러리는 1개만 사용하는 것이 이로울 것 같습니다. ([관련 이슈](https://github.com/ant-design/ant-design/issues/38794))

- 타입 설계에 대한 아쉬움이 있습니다.

  - 타입스크립트를 활용하여 중복 없이 더 깔끔한 타입 설계가 가능했을 것 같은데, 더 좋은 방법을 생각하지 못해 아쉽습니다.

  - 예를 들어, `FieldKey`와 `RecordType`의 프로퍼티 간의 관계를 더 명확하게 표현할 수 있을 것 같습니다.
