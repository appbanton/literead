import PassageCard from "@/components/PassageCard";
import PassagesList from "@/components/PassagesList";
import CTA from "@/components/CTA";
import {
  getAllReadingPassages,
  getRecentSessions,
} from "@/lib/actions/passage.actions";
import { getSubjectColor } from "@/lib/utils";

const Page = async () => {
  const passages = await getAllReadingPassages({ limit: 3 });
  const recentSessionsPassages = await getRecentSessions(10);

  return (
    <main>
      <h1>Popular Reading Lessons</h1>

      <section className="home-section">
        {passages.map((passage) => (
          <PassageCard
            key={passage.id}
            {...passage}
            color={getSubjectColor(passage.subject || "Fiction")}
          />
        ))}
      </section>

      <section className="home-section">
        <PassagesList
          title="Recently Completed Sessions"
          passages={recentSessionsPassages}
          classNames="w-2/3 max-lg:w-full"
        />
        <CTA />
      </section>
    </main>
  );
};

export default Page;
