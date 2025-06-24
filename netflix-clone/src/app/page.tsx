// app/page.tsx
// Next.js 15 + Tailwind CSS 테스트 페이지 (CSS 변수 활용)
export default function Home() {
  return (
    <div
      className="min-h-screen px-4 py-8"
      style={{
        background:
          "linear-gradient(135deg, var(--background) 0%, #1a1a1a 50%, var(--netflix-red-dark) 100%)",
      }}
    >
      {/* 전체 컨테이너 */}
      <div className="max-w-6xl mx-auto">
        {/* 헤더 섹션 */}
        <header className="text-center mb-12 animate-fade-in">
          <h1 className="text-6xl font-bold text-gradient-red mb-4 tracking-wider">
            NETFLIX
          </h1>
          <p className="text-white text-xl opacity-80">
            Next.js 15 + Tailwind CSS 테스트 페이지
          </p>
        </header>

        {/* 카드 그리드 테스트 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {/* 카드 1: Netflix 브랜드 컬러 테스트 */}
          <div className="netflix-card p-6 animate-slide-up">
            <h3 className="text-white text-xl font-semibold mb-3">
              브랜드 컬러
            </h3>
            <p className="text-gray-300 mb-4">
              Netflix 공식 브랜드 컬러가 적용되었습니다.
            </p>
            <div className="flex gap-3">
              <div
                className="w-6 h-6 rounded-lg border border-gray-600"
                style={{ backgroundColor: "var(--netflix-red)" }}
                title="Netflix Red"
              ></div>
              <div
                className="w-6 h-6 rounded-lg border border-gray-600"
                style={{ backgroundColor: "var(--netflix-red-dark)" }}
                title="Netflix Red Dark"
              ></div>
              <div
                className="w-6 h-6 rounded-lg border border-gray-600"
                style={{ backgroundColor: "var(--netflix-gray-dark)" }}
                title="Netflix Gray Dark"
              ></div>
              <div
                className="w-6 h-6 rounded-lg border border-gray-600"
                style={{ backgroundColor: "var(--netflix-gray)" }}
                title="Netflix Gray"
              ></div>
            </div>
          </div>

          {/* 카드 2: 호버 효과 테스트 */}
          <div
            className="netflix-card p-6 animate-slide-up"
            style={{ animationDelay: "0.2s" }}
          >
            <h3 className="text-white text-xl font-semibold mb-3">호버 효과</h3>
            <p className="text-gray-300">
              마우스를 올려보세요. 카드가 부드럽게 확대됩니다.
            </p>
            <div className="mt-4">
              <span className="text-green-400 text-sm">
                ✓ 호버 애니메이션 적용됨
              </span>
            </div>
          </div>

          {/* 카드 3: 반응형 테스트 */}
          <div
            className="netflix-card p-6 animate-slide-up"
            style={{ animationDelay: "0.4s" }}
          >
            <h3 className="text-white text-xl font-semibold mb-3">
              반응형 그리드
            </h3>
            <p className="text-gray-300">
              화면 크기를 조정해보세요. 그리드가 반응형으로 변합니다.
            </p>
            <div className="mt-4 grid grid-cols-3 gap-1">
              <div className="h-2 netflix-bg-red rounded"></div>
              <div
                className="h-2"
                style={{ backgroundColor: "var(--netflix-red-dark)" }}
              ></div>
              <div
                className="h-2"
                style={{ backgroundColor: "var(--netflix-red-light)" }}
              ></div>
            </div>
          </div>
        </div>

        {/* 버튼 테스트 섹션 */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
          {/* Netflix 스타일 주요 버튼 */}
          <button className="netflix-btn netflix-btn-primary">
            <span>▶</span>
            재생
          </button>

          {/* Netflix 스타일 보조 버튼 */}
          <button className="netflix-btn netflix-btn-secondary">
            <span>ℹ</span>
            상세 정보
          </button>
        </div>

        {/* 텍스트 스타일 테스트 */}
        <div className="text-center space-y-6 mb-12">
          <h2 className="text-4xl font-bold text-white">
            다양한 텍스트 스타일
          </h2>
          <h3 className="text-2xl font-semibold text-gray-300">
            부제목 스타일
          </h3>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed">
            이것은 본문 텍스트입니다. Netflix 클론 앱에서 사용할 다양한 텍스트
            스타일들을 테스트하고 있습니다. 가독성과 시각적 계층구조를
            확인해보세요.
          </p>
          <p className="text-sm text-gray-500">작은 크기의 부가 설명 텍스트</p>
        </div>

        {/* 컬러 팔레트 테스트 */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          <div className="text-center">
            <div
              className="w-20 h-20 mx-auto mb-3 rounded-xl shadow-lg"
              style={{ backgroundColor: "var(--netflix-red)" }}
            ></div>
            <p className="text-sm text-gray-400 font-medium">Netflix Red</p>
            <p className="text-xs text-gray-600">#E50914</p>
          </div>
          <div className="text-center">
            <div
              className="w-20 h-20 mx-auto mb-3 rounded-xl shadow-lg"
              style={{ backgroundColor: "var(--netflix-red-dark)" }}
            ></div>
            <p className="text-sm text-gray-400 font-medium">Red Dark</p>
            <p className="text-xs text-gray-600">#B81D24</p>
          </div>
          <div className="text-center">
            <div
              className="w-20 h-20 mx-auto mb-3 rounded-xl shadow-lg border border-gray-700"
              style={{ backgroundColor: "var(--netflix-gray-dark)" }}
            ></div>
            <p className="text-sm text-gray-400 font-medium">Gray Dark</p>
            <p className="text-xs text-gray-600">#141414</p>
          </div>
          <div className="text-center">
            <div
              className="w-20 h-20 mx-auto mb-3 rounded-xl shadow-lg"
              style={{ backgroundColor: "var(--netflix-gray)" }}
            ></div>
            <p className="text-sm text-gray-400 font-medium">Gray</p>
            <p className="text-xs text-gray-600">#2F2F2F</p>
          </div>
        </div>

        {/* 로딩 스피너 테스트 */}
        <div className="flex justify-center mb-8">
          <div
            className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2"
            style={{ borderColor: "var(--netflix-red)" }}
          ></div>
        </div>

        {/* 성공 메시지 */}
        <div
          className="text-center border rounded-lg p-4"
          style={{
            backgroundColor: "rgba(34, 197, 94, 0.1)",
            borderColor: "rgb(34, 197, 94)",
          }}
        >
          <p className="text-green-400 font-semibold text-lg">
            ✅ Next.js 15 + Tailwind CSS 설정이 성공적으로 완료되었습니다!
          </p>
          <p className="text-green-300 text-sm mt-2">
            모든 스타일과 애니메이션이 정상적으로 작동하고 있습니다.
          </p>
        </div>
      </div>
    </div>
  );
}
