import { Skeleton } from "@pes/ui/components/skeleton"

function App() {
  return (
    <div className="flex flex-col space-y-3">
      <div className="ml-5 flex flex-row space-x-3">
        <Skeleton className="h-[225px] w-[400px] rounded-xl" />
        <Skeleton className="h-[225px] w-[400px] rounded-xl" />
        {/* <Skeleton className="h-[225px] w-[400px] rounded-xl" /> */}
        {/* <div className="space-y-2">
          <Skeleton className="h-4 w-[250px]" />
          <Skeleton className="h-4 w-[200px]" />
        </div> */}
      </div>
      <div className="ml-5 flex flex-row space-x-3">
        <Skeleton className="h-[225px] w-[400px] rounded-xl" />
        <Skeleton className="h-[225px] w-[400px] rounded-xl" />
        {/* <Skeleton className="h-[225px] w-[400px] rounded-xl" /> */}
        {/* <div className="space-y-2">
          <Skeleton className="h-4 w-[250px]" />
          <Skeleton className="h-4 w-[200px]" />
        </div> */}
      </div>
      <div className="ml-5 flex flex-row space-x-3">
        <Skeleton className="h-[225px] w-[400px] rounded-xl" />
        <Skeleton className="h-[225px] w-[400px] rounded-xl" />
        {/* <Skeleton className="h-[225px] w-[400px] rounded-xl" /> */}
        {/* <div className="space-y-2">
          <Skeleton className="h-4 w-[250px]" />
          <Skeleton className="h-4 w-[200px]" />
        </div> */}
      </div>

    </div>
  )
}

export default App
