import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn, getSubjectColor } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";

interface PassagesListProps {
  title: string;
  passages?: ReadingPassage[];
  classNames?: string;
}

const PassagesList = ({ title, passages, classNames }: PassagesListProps) => {
  return (
    <article className={cn("companion-list", classNames)}>
      <h2 className="font-bold text-3xl">{title}</h2>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-lg w-2/3">Lessons</TableHead>
            <TableHead className="text-lg">Grade</TableHead>
            <TableHead className="text-lg text-right">Duration</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {passages?.map(
            ({
              id,
              subject,
              title,
              grade_level,
              estimated_duration_minutes,
            }) => (
              <TableRow key={id}>
                <TableCell>
                  <Link href={`/passages/${id}`}>
                    <div className="flex items-center gap-2">
                      <div
                        className="size-[72px] flex items-center justify-center rounded-lg max-md:hidden"
                        style={{
                          backgroundColor: getSubjectColor(
                            subject || "Fiction"
                          ),
                        }}
                      >
                        <Image
                          src={`/icons/${subject || "language"}.svg`}
                          alt={subject || "reading"}
                          width={35}
                          height={35}
                        />
                      </div>
                      <div className="flex flex-col gap-2">
                        <p className="font-bold text-2xl">{title}</p>
                        <p className="text-lg">Grade {grade_level}</p>
                      </div>
                    </div>
                  </Link>
                </TableCell>
                <TableCell>
                  <div className="subject-badge w-fit max-md:hidden">
                    {subject || "Reading"}
                  </div>
                </TableCell>
                <TableCell className="text-right text-2xl">
                  {estimated_duration_minutes} min
                </TableCell>
              </TableRow>
            )
          )}
        </TableBody>
      </Table>
    </article>
  );
};

export default PassagesList;
