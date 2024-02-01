import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";



export default async function shopLayout({
    children
   }: {
    children: React.ReactNode;
   }) {
        
            const session=await getServerSession(authOptions);

            if(!session?.user){
            redirect('/auth/login?redirectTo=/checkout/address')
            }
        return (
            <div>       
               {children}
            </div>
        );
    }