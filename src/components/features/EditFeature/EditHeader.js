import { Button } from '@/components/ui/button';
import { CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft } from 'lucide-react';

export const EditHeader = ({ title, onBack }) => (
    <CardHeader>
        <div className="flex items-center justify-between">
            <CardTitle>
                {title}
            </CardTitle>
            <Button
                variant="outline"
                size="sm"
                onClick={onBack}
            >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Voltar
            </Button>
        </div>
    </CardHeader>
);