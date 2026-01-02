import Image from "next/image";
import Link from "next/link";

const Cta = () => {
  return (
    <section className="cta-section">
      <div className="cta-badge">Start learning your way.</div>
      <h2 className="text-3xl font-bold">Create Your Own Reading Passage</h2>
      <p>
        Build custom reading lessons tailored to your student's level. Add your
        own content, set difficulty, and track progress.
      </p>
      <Image src="/images/cta.svg" alt="cta" width={362} height={232} />
      <Link href="/passages/new" className="btn-primary">
        <Image src="/icons/plus.svg" alt="plus" width={12} height={12} />
        <p>Create New Passage</p>
      </Link>
    </section>
  );
};

export default Cta;
