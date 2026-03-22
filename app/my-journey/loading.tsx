export default function MyJourneyLoading() {
  return (
    <main>
      <div className="min-h-screen" style={{ background: "#F9F8F6" }}>
        <div className="container mx-auto px-6 py-8 max-w-4xl">
          {/* Profile */}
          <section className="flex items-center gap-4 mb-8">
            <div
              className="rounded-full animate-pulse flex-shrink-0"
              style={{ width: "60px", height: "60px", background: "#e8e6e1" }}
            />
            <div className="flex flex-col gap-2">
              <div
                className="rounded-lg animate-pulse"
                style={{
                  height: "20px",
                  width: "140px",
                  background: "#e8e6e1",
                }}
              />
              <div
                className="rounded-lg animate-pulse"
                style={{
                  height: "12px",
                  width: "200px",
                  background: "#e8e6e1",
                }}
              />
            </div>
          </section>

          {/* Stats */}
          <section className="grid grid-cols-3 gap-3 mb-5 max-sm:grid-cols-1">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="rounded-2xl animate-pulse"
                style={{
                  background: "white",
                  border: "1px solid #e8e8e4",
                  padding: "18px 20px",
                }}
              >
                <div
                  className="rounded-xl mb-3"
                  style={{
                    width: "32px",
                    height: "32px",
                    background: "#f0efed",
                  }}
                />
                <div
                  className="rounded-lg mb-2"
                  style={{
                    height: "28px",
                    width: "60px",
                    background: "#f0efed",
                  }}
                />
                <div
                  className="rounded-lg"
                  style={{
                    height: "10px",
                    width: "100px",
                    background: "#f0efed",
                  }}
                />
              </div>
            ))}
          </section>

          {/* Plan card */}
          <section className="mb-5">
            <div
              className="rounded-2xl animate-pulse flex items-center justify-between"
              style={{
                background: "white",
                border: "1px solid #e8e8e4",
                padding: "20px 24px",
              }}
            >
              <div className="flex flex-col gap-2">
                <div
                  className="rounded-lg"
                  style={{
                    height: "10px",
                    width: "80px",
                    background: "#f0efed",
                  }}
                />
                <div
                  className="rounded-lg"
                  style={{
                    height: "18px",
                    width: "100px",
                    background: "#f0efed",
                  }}
                />
                <div
                  className="rounded-lg"
                  style={{
                    height: "12px",
                    width: "200px",
                    background: "#f0efed",
                  }}
                />
              </div>
              <div className="flex flex-col items-end gap-2">
                <div
                  className="rounded-lg"
                  style={{
                    height: "32px",
                    width: "60px",
                    background: "#f0efed",
                  }}
                />
                <div
                  className="rounded-lg"
                  style={{
                    height: "10px",
                    width: "100px",
                    background: "#f0efed",
                  }}
                />
              </div>
            </div>
          </section>

          {/* Accordion */}
          <section>
            <div
              className="rounded-2xl overflow-hidden animate-pulse"
              style={{
                background: "white",
                border: "1px solid #e8e8e4",
                padding: "18px 24px",
              }}
            >
              <div className="flex items-center gap-3">
                <div
                  className="rounded-lg"
                  style={{
                    height: "14px",
                    width: "160px",
                    background: "#f0efed",
                  }}
                />
                <div
                  className="rounded-full"
                  style={{
                    height: "18px",
                    width: "28px",
                    background: "#f0efed",
                  }}
                />
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
