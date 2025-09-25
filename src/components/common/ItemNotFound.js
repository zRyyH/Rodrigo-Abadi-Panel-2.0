import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertCircle, Home } from "lucide-react"
import Link from "next/link"

export default function ItemNotFound() {
    return (
        <div className="flex min-h-[80vh] items-center justify-center p-4">
            <Card className="w-full max-w-md">
                <CardHeader className="text-center">
                    <div className="mx-auto mb-4 flex size-16 items-center justify-center rounded-full bg-destructive/10">
                        <AlertCircle className="size-8 text-destructive" />
                    </div>
                    <CardTitle className="text-2xl">Item não encontrado</CardTitle>
                    <CardDescription>
                        Desculpe, o item que você está procurando não existe ou foi removido.
                    </CardDescription>
                </CardHeader>

                <CardContent className="space-y-4">
                    <div className="rounded-lg bg-muted p-4 text-sm text-muted-foreground">
                        <p>Possíveis motivos:</p>
                        <ul className="mt-2 space-y-1 list-disc list-inside">
                            <li>O item foi excluído</li>
                            <li>O link está incorreto</li>
                            <li>Você não tem permissão para acessar</li>
                        </ul>
                    </div>
                </CardContent>

                <CardFooter className="flex flex-col gap-2 sm:flex-row">
                    <Button asChild className="w-full sm:w-auto" variant="default">
                        <Link href="/products">
                            <Home />
                            Voltar ao início
                        </Link>
                    </Button>
                </CardFooter>
            </Card>
        </div>
    )
}