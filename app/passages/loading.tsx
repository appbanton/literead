export default function PassagesLoading() {
  return (
    <main>
      <div className="min-h-screen" style={{ background: "#F9F8F6" }}>
        <div className="container mx-auto px-6 py-8 max-w-7xl">
          {/* Header */}
          <div className="flex justify-between items-start mb-8 max-sm:flex-col max-sm:gap-4">
            <div className="flex flex-col gap-3">
              <div
                className="h-8 w-48 rounded-xl animate-pulse"
                style={{ background: "#e8e6e1" }}
              />
              <div
                className="h-4 w-72 rounded-lg animate-pulse"
                style={{ background: "#e8e6e1" }}
              />
            </div>
            <div
              className="h-16 w-36 rounded-2xl animate-pulse"
              style={{ background: "#e8e6e1" }}
            />
          </div>

          {/* Filters */}
          <div className="flex gap-4 mb-6 max-sm:flex-col">
            <div
              className="h-10 w-36 rounded-xl animate-pulse"
              style={{ background: "#e8e6e1" }}
            />
            <div
              className="h-10 w-44 rounded-xl animate-pulse"
              style={{ background: "#e8e6e1" }}
            />
          </div>

          {/* Cards grid — matches PassageCard exactly */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="animate-pulse"
                style={{
                  borderRadius: "20px",
                  padding: "5px",
                  background: "rgba(0,0,0,0.025)",
                  border: "1px solid rgba(0,0,0,0.07)",
                }}
              >
                <div
                  style={{
                    background: "#f3f2f0",
                    borderRadius: "16px",
                    height: "180px",
                    display: "flex",
                    flexDirection: "column",
                    padding: "14px 14px 12px",
                  }}
                >
                  {/* Badge row */}
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginBottom: "10px",
                    }}
                  >
                    <div
                      style={{
                        height: "22px",
                        width: "80px",
                        background: "#e8e6e1",
                        borderRadius: "999px",
                      }}
                    />
                    <div
                      style={{
                        height: "22px",
                        width: "22px",
                        background: "#e8e6e1",
                        borderRadius: "999px",
                      }}
                    />
                  </div>
                  {/* Title lines */}
                  <div
                    style={{
                      height: "14px",
                      width: "90%",
                      background: "#e8e6e1",
                      borderRadius: "8px",
                      marginBottom: "8px",
                    }}
                  />
                  <div
                    style={{
                      height: "14px",
                      width: "60%",
                      background: "#e8e6e1",
                      borderRadius: "8px",
                    }}
                  />
                  {/* Bottom group */}
                  <div
                    style={{
                      marginTop: "auto",
                      display: "flex",
                      gap: "6px",
                      marginBottom: "8px",
                    }}
                  >
                    <div
                      style={{
                        height: "22px",
                        width: "70px",
                        background: "#e8e6e1",
                        borderRadius: "999px",
                      }}
                    />
                    <div
                      style={{
                        height: "22px",
                        width: "50px",
                        background: "#e8e6e1",
                        borderRadius: "999px",
                      }}
                    />
                  </div>
                  {/* Button */}
                  <div
                    style={{
                      height: "34px",
                      background: "#e0ded9",
                      borderRadius: "10px",
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
