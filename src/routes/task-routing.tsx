import PageTitle from "@/components/ui/PageTitle";
import { Route } from "react-router-dom";
export default (
  <Route path="tasks">
    <Route
      path="category-1"
      element={
        <>
          <PageTitle title="Task" />
        </>
      }
    />
    <Route path="category-2" element={<>Task Category 2</>} />
  </Route>
);
