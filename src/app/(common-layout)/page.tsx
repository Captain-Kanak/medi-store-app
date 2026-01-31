import { userService } from "@/services/user.service";

export default async function Home() {
  const { data } = await userService.getSession();

  console.log(data);

  return (
    <>
      <h1>Home</h1>
    </>
  );
}
