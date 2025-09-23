import { Card, CardContent } from '@/components/ui/card';
import DynamicForm from '@/components/common/DynamicForm'; // Mudança aqui
import { EditHeader } from './EditHeader';
import { EditActions } from './EditActions';
import { useMemo } from 'react';

export const EditForm = ({
    title,
    fields,
    formData,
    onFormChange,
    onSubmit,
    onBack,
    isSubmitting,
    mode = 'edit'
}) => {
    // Garantir que formData sempre tenha valores válidos para todos os campos
    const safeFormData = useMemo(() => {
        if (!formData || !fields) return {};

        const safeData = { ...formData };

        // Para cada campo definido, garantir que há um valor inicial
        fields.forEach(field => {
            const fieldName = field.name;
            if (fieldName && !(fieldName in safeData)) {
                // Definir valor padrão baseado no tipo do campo
                switch (field.type) {
                    case 'number':
                        safeData[fieldName] = 0;
                        break;
                    case 'checkbox':
                    case 'switch':
                        safeData[fieldName] = false;
                        break;
                    case 'select':
                        safeData[fieldName] = '';
                        break;
                    case 'file':
                        safeData[fieldName] = null;
                        break;
                    case 'textarea':
                    case 'text':
                    case 'email':
                    case 'password':
                    default:
                        safeData[fieldName] = '';
                        break;
                }
            }
        });

        return safeData;
    }, [formData, fields]);

    return (
        <div className="container mx-auto p-6 max-w-2xl">
            <Card>
                <EditHeader title={title} onBack={onBack} />
                <CardContent>
                    <DynamicForm
                        fields={fields}
                        values={safeFormData}
                        onFieldChange={(fieldName, newValue) => {
                            onFormChange({
                                ...safeFormData,
                                [fieldName]: newValue
                            });
                        }}
                        className="space-y-6"
                    />
                    <EditActions
                        isSubmitting={isSubmitting}
                        onSubmit={onSubmit}
                        disabled={!formData}
                        mode={mode}
                    />
                </CardContent>
            </Card>
        </div>
    );
};