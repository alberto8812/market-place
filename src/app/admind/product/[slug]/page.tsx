import { getAllCategories, getProductAdmindBySlug, getProductBySlug } from "@/actions";
import { Title } from "@/components";
import { redirect } from "next/navigation";
import { ProductForm } from "./ui/ProductFrom";


interface Props {
  params: {
    slug: string;
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = params;

  const [product, getCategories] = await Promise.all([
    getProductAdmindBySlug(slug),
    getAllCategories(),
  ]);

  // todu: new

  if (!product && slug !=='new') {
    redirect("/admind/products");
  }

  const title = slug === "new" ? "Nuevo Producto" : "Editar Producto";

  return (
    <div className="h-full ml-14 mt-5 mb-10 md:ml-72">
      <Title title={title} />
      <ProductForm product={product ?? {}} categories={getCategories} />
    </div>
  );
}
