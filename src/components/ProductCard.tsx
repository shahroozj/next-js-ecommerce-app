import { formatCurrency } from "@/lib/formatters";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import Link from "next/link";
import Image from "next/image";

type ProductCardProps = {
    id: string
    name: string
    priceInCents: number
    description: string
    imagePath: string
}

export function ProductCard({id, name, priceInCents, description, imagePath} : ProductCardProps){
    return <Card>
        <div className="relative w-full h-auto aspect-video">
            <Image src={imagePath} fill alt={name}/>
        </div>
        <CardHeader className="flex overflow-hidden flex-column">
            <CardTitle>{name}</CardTitle>
            <CardDescription>{formatCurrency(priceInCents/100)}</CardDescription>
            <CardContent className="flex-grew">
                <p className="line-clamp-4">{description}</p>
            </CardContent>
            <CardFooter>
                <Button asChild size="lg" className="w-full">
                    <Link href={`/products/${id}/purchase`}>Purchase</Link>
                </Button>
            </CardFooter>
        </CardHeader>
    </Card>
}

export function ProductCardSkeleton(){
    return <Card className="overflow-hidden flex flex-col animate-pulse">
        <div className="w-full aspect-video bg-gray-300">
        </div>
        <CardHeader>
            <CardTitle>
                <div className="w-3/4 h-6 rounded-full bg-gray-300"></div>
            </CardTitle>
            <CardDescription>
                <div className="w-1/2 h-4 rounded-full bg-gray-300"></div>
            </CardDescription>
            <CardContent className="space-y-2">
                <div className="w-full h-4 rounded-full bg-gray-300"></div>
                <div className="w-full h-4 rounded-full bg-gray-300"></div>
                <div className="w-3/4 h-4 rounded-full bg-gray-300"></div>
            </CardContent>
            <CardFooter>
                <Button size="lg" className="w-full" disabled></Button>
            </CardFooter>
        </CardHeader>
    </Card>
}