import { Stack, Redirect } from "expo-router";

export default function Layout() {
  return (
    <>
      {/* Redirects the root route (/) to /parent_login */}
      <Redirect href="./App" />

      <Stack />
    </>
  );
}