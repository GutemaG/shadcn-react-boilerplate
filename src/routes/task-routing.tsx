import PageTitle from "@/components/ui/PageTitle";
import { useFetchData } from "@/hooks/useFetchData";
import { User, getUsers } from "@/lib/api/userApi";
import { Route } from "react-router-dom";

const Home = () => {
  const { data: users, loading, error } = useFetchData<User[]>(getUsers);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  return (
    <>
      {users &&
        users.map((user) => (
          <div key={user.id}>
            <div>{user.name}</div>
            <div>{user.email}</div>
          </div>
        ))}
      <br />
    </>
  );
};

export default (
  <Route path="tasks">
    <Route
      path="category-1"
      element={
        <>
          <PageTitle title="Task" />
          <Home />
        </>
      }
    />
    <Route path="category-2" element={<>Task Category 2</>} />
  </Route>
);
