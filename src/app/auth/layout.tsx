
import { titleFont } from "../config/fonts";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { AuthProvider } from "@/providers";


export default async function shopLayout({
 children
}: {
 children: React.ReactNode;
}) {

  const session=await getServerSession(authOptions);

  if(session?.user){
    redirect('/')
  }

  return (
    <main className={`${titleFont.className}`}>
      <div>
        <AuthProvider>
         {children}
        </AuthProvider>
      </div> 
    </main>
  );
}