import TableLoadingSkeleton from "@/components/ui/TableLoadingSkeleton";
import { useFetchData } from "@/hooks/useFetchData";
import { UserPaginationResponse, User, getUsers } from "@/lib/api/userApi";

const UserListPage = () => {
  const { data, loading, error } =
    useFetchData<UserPaginationResponse<User>>(getUsers);

  if (loading)
    return (
      <div>
        <TableLoadingSkeleton />
      </div>
    );
  if (error) return <div>{error}</div>;
  return (
    <>
      {data &&
        data.users.map((user) => (
          <div key={user.id}>
            <div className="flex gap-3">
              {user.firstName} {user.lastName}
            </div>
            <div>
              {user.email} {user.username}
            </div>
          </div>
        ))}
    </>
  );
};

export default UserListPage;
