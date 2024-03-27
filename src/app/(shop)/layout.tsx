import { getCategoryAndSubcategory } from "@/actions";
import { Footer, Sidebar, SidebarItemMobil, TopMenu } from "@/components";


import { AuthProvider } from "@/providers";


export default async function shopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const categoriesAnsubcategories = await getCategoryAndSubcategory();

  return (
    <main className="min-h-screen">

            
      <AuthProvider>
        
        <TopMenu categoriesSubcategories={categoriesAnsubcategories} />
 
        <Sidebar />
        <SidebarItemMobil categoriesSubcategories={categoriesAnsubcategories} />
        {children}

        <Footer />
      </AuthProvider>
         
    </main>
  );
}
