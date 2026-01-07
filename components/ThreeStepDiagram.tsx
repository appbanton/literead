import Image from "next/image";

const ThreeStepDiagram = () => {
  return (
    <div className="flex items-center justify-center gap-8 my-12 max-sm:flex-col max-sm:gap-6">
      {/* Step 1: Read */}
      <div className="flex flex-col items-center gap-3">
        <div className="w-24 h-24 rounded-full bg-[#BDE7FF] flex items-center justify-center">
          <Image src="/icons/book.svg" alt="Read" width={48} height={48} />
        </div>
        <p className="font-bold text-lg">Read</p>
        <p className="text-sm text-gray-600 text-center max-w-[150px]">
          Choose a passage at your level
        </p>
      </div>

      {/* Arrow */}
      <div className="text-4xl text-primary max-sm:rotate-90">→</div>

      {/* Step 2: Discuss */}
      <div className="flex flex-col items-center gap-3">
        <div className="w-24 h-24 rounded-full bg-[#FFE5B4] flex items-center justify-center">
          <Image
            src="/icons/microphone.svg"
            alt="Discuss"
            width={48}
            height={48}
          />
        </div>
        <p className="font-bold text-lg">Discuss</p>
        <p className="text-sm text-gray-600 text-center max-w-[150px]">
          Talk with your AI coach
        </p>
      </div>

      {/* Arrow */}
      <div className="text-4xl text-primary max-sm:rotate-90">→</div>

      {/* Step 3: Understand */}
      <div className="flex flex-col items-center gap-3">
        <div className="w-24 h-24 rounded-full bg-[#C8E6C9] flex items-center justify-center">
          <Image
            src="/icons/lightbulb.svg"
            alt="Understand"
            width={48}
            height={48}
          />
        </div>
        <p className="font-bold text-lg">Understand</p>
        <p className="text-sm text-gray-600 text-center max-w-[150px]">
          Master what you read
        </p>
      </div>
    </div>
  );
};

export default ThreeStepDiagram;
