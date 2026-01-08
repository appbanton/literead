import { getAllReadingPassages } from "@/lib/actions/passage.actions";
import { getUserSubscription } from "@/lib/actions/subscription.actions";
import PassageCard from "@/components/PassageCard";
import { getSubjectColor } from "@/lib/utils";
import SearchInput from "@/components/SearchInput";
import SubjectFilter from "@/components/SubjectFilter";

const PassagesLibrary = async ({ searchParams }: SearchParams) => {
  const filters = await searchParams;
  const subject = filters.subject ? (filters.subject as string) : "";
  const grade_level = filters.grade_level
    ? (filters.grade_level as string)
    : "";

  const passages = await getAllReadingPassages({ subject, grade_level });

  // Get real subscription data from Supabase
  const subscription = await getUserSubscription();
  const sessionsRemaining = subscription?.sessions_remaining || 0;
  const totalSessions = subscription?.total_sessions || 0;

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-6 py-8 max-w-7xl">
        {/* Header Section */}
        <div className="flex justify-between items-center mb-8 max-sm:flex-col max-sm:gap-4">
          <div>
            <h1 className="text-4xl font-bold mb-2">Reading Library</h1>
            <p className="text-gray-600">
              Choose a passage at your level and start practicing
            </p>
          </div>
          <div className="flex items-center gap-4">
            {subscription ? (
              <div className="bg-white px-4 py-2 rounded-lg shadow-sm border border-gray-200">
                <span className="text-sm text-gray-600">Sessions: </span>
                <span className="font-bold text-primary">
                  {sessionsRemaining}/{totalSessions}
                </span>
              </div>
            ) : (
              <div className="bg-white px-4 py-2 rounded-lg shadow-sm border border-gray-200">
                <span className="text-sm text-gray-600">
                  No active subscription
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Filters */}
        <div className="flex justify-end gap-4 mb-6 max-sm:flex-col">
          <SearchInput />
          <SubjectFilter />
        </div>

        {/* Passages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {passages.map((passage) => (
            <PassageCard
              key={passage.id}
              {...passage}
              color={getSubjectColor(passage.subject || "Fiction")}
            />
          ))}
        </div>

        {/* Empty State */}
        {passages.length === 0 && (
          <div className="text-center py-16">
            <p className="text-gray-500 text-lg mb-4">No passages found</p>
            <p className="text-gray-400">Try adjusting your filters</p>
          </div>
        )}
      </div>
    </main>
  );
};

export default PassagesLibrary;
