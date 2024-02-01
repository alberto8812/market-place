
export const revalidate = 0;

import { getPaginaterUsers } from "@/actions";
import { Pagination, Title } from "@/components";
import { redirect } from "next/navigation";
import { UserTable } from "./ui/UserTable";

export default async function AdminUsers() {
  const { ok, users = [] } = await getPaginaterUsers();
   
  if (!ok) {
    redirect("/auth/login");
  }

  return (
    <div className="h-full ml-14 mt-5 mb-10 md:ml-64">
      <Title title="Todas las Ordenes" />

      <div className="mb-10">
        <UserTable users={users}/>
        {/* <Pagination totalPages={3}/> */}
      </div>
    </div>
  );
}
