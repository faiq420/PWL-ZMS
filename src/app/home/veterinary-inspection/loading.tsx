import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

export default function VeterinaryInspectionLoading() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-10 w-36" />
      </div>

      <div className="space-y-4">
        <Skeleton className="h-10 w-96" />

        <Card>
          <CardHeader>
            <Skeleton className="h-5 w-48 mb-2" />
            <Skeleton className="h-4 w-72" />
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-2">
              <Skeleton className="h-10 w-full sm:w-2/3" />
              <div className="flex gap-2">
                <Skeleton className="h-10 w-32" />
                <Skeleton className="h-10 w-32" />
              </div>
            </div>

            <div className="rounded-md border p-4">
              <div className="space-y-3">
                <div className="flex items-center">
                  <Skeleton className="h-4 w-16 mr-4" />
                  <Skeleton className="h-4 w-24 mr-4" />
                  <Skeleton className="h-4 w-24 mr-4" />
                  <Skeleton className="h-4 w-32 mr-4" />
                  <Skeleton className="h-4 w-24 mr-4" />
                  <Skeleton className="h-4 w-20 mr-4" />
                  <Skeleton className="h-4 w-24" />
                </div>
                {Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className="flex items-center">
                    <Skeleton className="h-4 w-16 mr-4" />
                    <Skeleton className="h-4 w-24 mr-4" />
                    <Skeleton className="h-4 w-24 mr-4" />
                    <Skeleton className="h-4 w-32 mr-4" />
                    <Skeleton className="h-4 w-24 mr-4" />
                    <Skeleton className="h-4 w-20 mr-4" />
                    <Skeleton className="h-8 w-24" />
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <Skeleton className="h-5 w-48 mb-2" />
              <Skeleton className="h-4 w-64" />
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {Array.from({ length: 2 }).map((_, i) => (
                  <div key={i} className="border rounded-lg p-4">
                    <div className="flex gap-4">
                      <Skeleton className="h-12 w-12 rounded-full" />
                      <div className="flex-1 space-y-2">
                        <Skeleton className="h-4 w-36" />
                        <Skeleton className="h-3 w-24" />
                        <Skeleton className="h-3 w-32" />
                      </div>
                      <Skeleton className="h-8 w-24" />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <div className="p-6 pt-0">
              <Skeleton className="h-9 w-full" />
            </div>
          </Card>

          <Card>
            <CardHeader>
              <Skeleton className="h-5 w-48 mb-2" />
              <Skeleton className="h-4 w-64" />
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="border rounded-lg p-4">
                    <div className="flex gap-4">
                      <Skeleton className="h-12 w-12 rounded-full" />
                      <div className="flex-1 space-y-2">
                        <Skeleton className="h-4 w-36" />
                        <Skeleton className="h-3 w-24" />
                      </div>
                      <Skeleton className="h-8 w-24" />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <div className="p-6 pt-0">
              <Skeleton className="h-9 w-full" />
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
