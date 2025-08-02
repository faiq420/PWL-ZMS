import { Skeleton } from "@/components/ui/skeleton";
import SectionIntro from "@/components/utils/Headings/SectionIntro";

export default function ReportsLogsLoading() {
  return (
    <div className="flex flex-col gap-6">
      <SectionIntro
        title="Reports & Logs"
        description="Access various reports and system logs for comprehensive insights."
      />
      <div className="grid w-full grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Skeleton className="h-[150px] w-full" />
        <Skeleton className="h-[150px] w-full" />
        <Skeleton className="h-[150px] w-full" />
        <Skeleton className="h-[150px] w-full" />
      </div>
      <Skeleton className="h-[200px] w-full" />
    </div>
  );
}
