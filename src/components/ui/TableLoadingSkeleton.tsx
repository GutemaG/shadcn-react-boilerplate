import { Skeleton } from "./skeleton";

const TableLoadingSkeleton = () => {
  const rows = Array(10).fill(null);

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full">
        <thead>
          <tr>
            <th className="px-6 py-3  text-left text-sm font-semibold ">
              <Skeleton className="h-4 w-full" />
            </th>
            <th className="px-6 py-3 text-left text-sm font-semibold">
              <Skeleton className="h-4 w-full" />
            </th>
            <th className="px-6 py-3  text-left text-sm font-semibold">
              <Skeleton className="h-4 w-full" />
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((_, index) => (
            <tr key={index}>
              <td className="px-6 py-4 ">
                <Skeleton className="h-4 w-full bg-gray-500" />
              </td>
              <td className="px-6 py-4">
                <Skeleton className="h-4 w-full bg-gray-500" />
              </td>
              <td className="px-6 py-4">
                <Skeleton className="h-4 w-full bg-gray-500" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableLoadingSkeleton;
