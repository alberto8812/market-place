import { AuthProvider } from "@/providers";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { AdminSidebar, AdminTopMenu } from "@/components";

export default async function shopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    if (session?.user?.roles !== "Admind") {
      redirect("./");
    }

    redirect("./");
  }

  return (
    <main className="">
      <AuthProvider>
      
          {/* <AdminTopMenu/> */}
          <AdminSidebar />
          {children}
     
      </AuthProvider>
    </main>
  );
}
