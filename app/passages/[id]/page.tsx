import { getReadingPassage } from "@/lib/actions/passage.actions";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { getSubjectColor } from "@/lib/utils";
import Image from "next/image";
import ReadingSessionComponent from "@/components/ReadingSessionComponent";

interface PassageSessionPageProps {
  params: Promise<{ id: string }>;
}

const PassageSession = async ({ params }: PassageSessionPageProps) => {
  const { id } = await params;
  const passage = await getReadingPassage(id);
  const user = await currentUser();

  if (!user) redirect("/sign-in");
  if (!passage) redirect("/passages");

  const { title, subject, grade_level, estimated_duration_minutes } = passage;

  return (
    <main>
      <article className="flex rounded-border justify-between p-6 max-md:flex-col">
        <div className="flex items-center gap-2">
          <div
            className="size-[72px] flex items-center justify-center rounded-lg max-md:hidden"
            style={{ backgroundColor: getSubjectColor(subject || "Fiction") }}
          >
            <Image
              src={`/icons/${subject || "language"}.svg`}
              alt={subject || "reading"}
              width={35}
              height={35}
            />
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <p className="font-bold text-2xl">{title}</p>
              <div className="subject-badge max-sm:hidden">
                {subject || "Reading"}
              </div>
            </div>
            <p className="text-lg">Grade {grade_level}</p>
          </div>
        </div>
        <div className="items-start text-2xl max-md:hidden">
          {estimated_duration_minutes} minutes
        </div>
      </article>

      <ReadingSessionComponent
        passageId={id}
        title={title}
        subject={subject}
        topic={`Grade ${grade_level}`}
        userName={user.firstName!}
        userImage={user.imageUrl!}
        voice="female"
        style="casual"
      />
    </main>
  );
};

export default PassageSession;
