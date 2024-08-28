import { Route } from "react-router-dom";

export default (
  <Route path="auth">
    <Route path="signin" element={<>Sign in</>} />
    <Route path="signup" element={<>sign up</>} />
  </Route>
);
