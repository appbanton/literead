import PassageForm from "@/components/PassageForm";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { newPassagePermissions } from "@/lib/actions/passage.actions";
import Image from "next/image";
import Link from "next/link";

const NewPassage = async () => {
  const { userId } = await auth();
  if (!userId) redirect("/sign-in");

  const canCreatePassage = await newPassagePermissions();

  return (
    <main className="min-lg:w-1/3 min-md:w-2/3 items-center justify-center">
      {canCreatePassage ? (
        <article className="w-full gap-4 flex flex-col">
          <h1>Create Reading Passage</h1>
          <PassageForm />
        </article>
      ) : (
        <article className="companion-limit">
          <Image
            src="/images/limit.svg"
            alt="Passage limit reached"
            width={360}
            height={230}
          />
          <div className="cta-badge">Upgrade your plan</div>
          <h1>You've Reached Your Limit</h1>
          <p>
            You've reached your custom passage limit. Upgrade to create more
            passages and access premium features.
          </p>
          <Link
            href="/subscription"
            className="btn-primary w-full justify-center"
          >
            Upgrade My Plan
          </Link>
        </article>
      )}
    </main>
  );
};

export default NewPassage;
