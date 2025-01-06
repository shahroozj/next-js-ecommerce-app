import db from "@/app/db/db";
import { ProductCard, ProductCardSkeleton } from "@/components/ProductCard";
import { wait } from "@/lib/utils";
import { Product } from "@prisma/client";
import { Suspense } from "react";

function getProducts(){
    return db.product.findMany({
        where: {isAvailableForPurchase: true},
        orderBy: {name:"asc"}
    })
}

export default function ProductsPage(){
    return <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <Suspense fallback={
                    <>
                        <ProductCardSkeleton/>
                        <ProductCardSkeleton/>
                        <ProductCardSkeleton/>
                        <ProductCardSkeleton/>
                        <ProductCardSkeleton/>
                        <ProductCardSkeleton/>
                    </>
                }>
                    <ProductsSuspense></ProductsSuspense>
                </Suspense>
            </div>
}

async function ProductsSuspense() {
    const products = await getProducts()
    return products.map(product =>(
        <ProductCard key={product.id} {...product} />
    ))
}

