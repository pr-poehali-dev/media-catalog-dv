import { Skeleton } from "@/components/ui/skeleton";

const PageLoader = () => {
  return (
    <div className="container mx-auto px-4 py-16 animate-in fade-in duration-300">
      <div className="max-w-3xl mx-auto space-y-6">
        <Skeleton className="h-10 w-2/3" />
        <Skeleton className="h-5 w-full" />
        <Skeleton className="h-5 w-5/6" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="space-y-4">
            <Skeleton className="h-48 w-full rounded-xl" />
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default PageLoader;
