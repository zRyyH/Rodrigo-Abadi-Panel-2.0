import { Button } from '@/components/ui/button';
import { Loader2, Save, Plus } from 'lucide-react';

export const EditActions = ({ isSubmitting, onSubmit, disabled, mode = 'edit' }) => {
    const isCreateMode = mode === 'create';
    const buttonText = isCreateMode ? 'Criar Item' : 'Salvar Alterações';
    const loadingText = isCreateMode ? 'Criando...' : 'Salvando...';
    const Icon = isCreateMode ? Plus : Save;

    return (
        <div className="flex gap-3 mt-6 pt-6 border-t">
            <Button
                onClick={onSubmit}
                disabled={isSubmitting || disabled}
                className="flex-1"
            >
                {isSubmitting ? (
                    <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        {loadingText}
                    </>
                ) : (
                    <>
                        <Icon className="h-4 w-4 mr-2" />
                        {buttonText}
                    </>
                )}
            </Button>
        </div>
    );
};