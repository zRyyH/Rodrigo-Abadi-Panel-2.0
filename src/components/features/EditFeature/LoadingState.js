import { Loader2 } from 'lucide-react';

export const LoadingState = () => (
    <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
            <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
            <p>Carregando dados...</p>
        </div>
    </div>
);