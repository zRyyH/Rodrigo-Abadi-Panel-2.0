import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export const ErrorState = ({ error, id, onRetry, onBack, mode = 'edit' }) => {
    const isCreateMode = mode === 'create';

    const message = error
        ? `Erro ao ${isCreateMode ? 'preparar criação' : 'carregar item'}: ${error}`
        : !id && !isCreateMode
            ? 'ID não informado na URL'
            : !isCreateMode
                ? 'Item não encontrado'
                : 'Erro na inicialização';

    return (
        <Card className="max-w-md mx-auto mt-8">
            <CardContent className="pt-6 text-center">
                <p className={`mb-4 ${error ? 'text-destructive' : ''}`}>
                    {message}
                </p>
                <div className="space-y-2">
                    {error && (
                        <Button onClick={onRetry} variant="outline">
                            Tentar novamente
                        </Button>
                    )}
                    <Button onClick={onBack}>Voltar</Button>
                </div>
            </CardContent>
        </Card>
    );
};