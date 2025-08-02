import { Skeleton } from "@/components/ui/skeleton"
// import PageHeader from "@/components/page-header"

export default function FeedSchedulingLoading() {
  return (
    <div className="flex flex-col gap-6">
      {/* <PageHeader title="Feed Scheduling" description="Manage feeding schedules for all animals in the zoo." /> */}
      <div className="grid w-full grid-cols-2 gap-2">
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
      </div>
      <div className="grid gap-4">
        <Skeleton className="h-[200px] w-full" />
        <Skeleton className="h-[300px] w-full" />
      </div>
    </div>
  )
}
