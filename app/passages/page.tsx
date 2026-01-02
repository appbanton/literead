import { getAllReadingPassages } from "@/lib/actions/passage.actions";
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

  return (
    <main>
      <section className="flex justify-between gap-4 max-sm:flex-col">
        <h1>Reading Library</h1>
        <div className="flex gap-4">
          <SearchInput />
          <SubjectFilter />
        </div>
      </section>
      <section className="companions-grid">
        {passages.map((passage) => (
          <PassageCard
            key={passage.id}
            {...passage}
            color={getSubjectColor(passage.subject || "Fiction")}
          />
        ))}
      </section>
    </main>
  );
};

export default PassagesLibrary;
