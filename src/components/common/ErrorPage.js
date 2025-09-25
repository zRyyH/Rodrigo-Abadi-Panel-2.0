import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertTriangle, Home, RefreshCw } from "lucide-react"
import Link from "next/link"

export default function ErrorPage() {
    const handleRefresh = () => {
        window.location.reload()
    }

    return (
        <div className="flex min-h-[80vh] items-center justify-center p-4">
            <Card className="w-full max-w-md">
                <CardHeader className="text-center">
                    <div className="mx-auto mb-4 flex size-16 items-center justify-center rounded-full bg-destructive/10">
                        <AlertTriangle className="size-8 text-destructive" />
                    </div>
                    <CardTitle className="text-2xl">Algo deu errado</CardTitle>
                    <CardDescription>
                        Ocorreu um erro inesperado. Tente novamente em alguns instantes.
                    </CardDescription>
                </CardHeader>

                <CardContent className="space-y-4">
                    <Alert variant="destructive">
                        <AlertTriangle className="size-4" />
                        <AlertTitle>Erro no sistema</AlertTitle>
                        <AlertDescription>
                            Não foi possível completar sua solicitação. Nossa equipe foi notificada automaticamente.
                        </AlertDescription>
                    </Alert>

                    <div className="rounded-lg bg-muted p-4 text-sm text-muted-foreground">
                        <p className="font-medium mb-2">O que você pode fazer:</p>
                        <ul className="space-y-1 list-disc list-inside">
                            <li>Recarregar a página</li>
                            <li>Verificar sua conexão com a internet</li>
                            <li>Tentar novamente mais tarde</li>
                        </ul>
                    </div>
                </CardContent>

                <CardFooter className="flex flex-col gap-2 sm:flex-row">
                    <Button
                        onClick={handleRefresh}
                        className="w-full sm:w-auto"
                        variant="default"
                    >
                        <RefreshCw />
                        Tentar novamente
                    </Button>
                    <Button asChild className="w-full sm:w-auto" variant="outline">
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