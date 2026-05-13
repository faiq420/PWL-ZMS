import { Skeleton } from "@/components/ui/skeleton"
// import PageHeader from "@/components/page-header"

export default function EnclosureZoneManagementLoading() {
  return (
    <div className="flex flex-col gap-6">
      {/* <PageHeader
        title="Enclosure & Zone Management"
        description="Manage zoo enclosures and define geographical zones."
      /> */}
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
