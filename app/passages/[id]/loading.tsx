export default function ReadingSessionLoading() {
  return (
    <main className="min-h-screen" style={{ background: "#F9F8F6" }}>
      <div className="container mx-auto px-6 py-8 max-w-3xl">
        {/* Top row skeleton — back button + session counter */}
        <div className="flex items-center justify-between mb-8">
          <div className="h-5 w-32 bg-gray-200 rounded-lg animate-pulse" />
          <div className="h-14 w-36 bg-gray-200 rounded-2xl animate-pulse" />
        </div>

        {/* Card skeleton — matches reading-session-client exactly */}
        <div
          className="rounded-2xl overflow-hidden animate-pulse"
          style={{ background: "white", border: "1px solid #e8e8e4" }}
        >
          {/* Card header */}
          <div
            className="flex items-center justify-between px-8 py-5"
            style={{ borderBottom: "1px solid #f0f0ee" }}
          >
            <div className="flex items-center gap-3">
              <div
                className="h-6 w-16 rounded-full"
                style={{ background: "#f0efed" }}
              />
              <div
                className="h-4 w-40 rounded-lg"
                style={{ background: "#f0efed" }}
              />
            </div>
            <div
              className="h-4 w-28 rounded-lg"
              style={{ background: "#f0efed" }}
            />
          </div>

          {/* Card body */}
          <div className="px-8 py-8">
            {/* Title */}
            <div
              className="h-8 w-2/3 rounded-xl mb-8"
              style={{ background: "#f0efed" }}
            />

            {/* Paragraph lines */}
            <div className="space-y-3 mb-6">
              <div
                className="h-4 w-full rounded"
                style={{ background: "#f0efed" }}
              />
              <div
                className="h-4 w-full rounded"
                style={{ background: "#f0efed" }}
              />
              <div
                className="h-4 w-5/6 rounded"
                style={{ background: "#f0efed" }}
              />
              <div
                className="h-4 w-full rounded"
                style={{ background: "#f0efed" }}
              />
              <div
                className="h-4 w-4/5 rounded"
                style={{ background: "#f0efed" }}
              />
              <div
                className="h-4 w-full rounded"
                style={{ background: "#f0efed" }}
              />
              <div
                className="h-4 w-3/4 rounded"
                style={{ background: "#f0efed" }}
              />
            </div>

            {/* Confirmation box skeleton */}
            <div
              className="rounded-xl p-5"
              style={{ background: "#F9F8F6", border: "1px solid #e8e8e4" }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div
                  className="h-4 w-4 rounded"
                  style={{ background: "#e8e6e1" }}
                />
                <div
                  className="h-4 w-48 rounded-lg"
                  style={{ background: "#e8e6e1" }}
                />
              </div>
              <div
                className="h-12 w-full rounded-xl"
                style={{ background: "#e8e6e1" }}
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
