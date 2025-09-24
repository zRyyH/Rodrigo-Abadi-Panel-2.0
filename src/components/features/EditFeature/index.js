import useFormHook from '@/hooks/useFormHook';
import LoadingScreen from '@/components/common/LoadingScreen';
import { EditForm } from './EditForm';
import { useRouter, useParams } from 'next/navigation';

const EditPage = ({
    collection,
    fields = [],
    options = {},
    title,
    redirectPath = '/',
    onSuccess,
    mode = 'edit'
}) => {
    const router = useRouter();
    const { id } = useParams();
    const isCreateMode = mode === 'create';

    const {
        values: formData,
        loading,
        handleFieldChange,
        saveForm
    } = useFormHook(collection, isCreateMode ? null : id, options);

    const handleSubmit = async () => {
        const result = await saveForm();
        if (result) {
            onSuccess?.(result);
            router.push(redirectPath);
        }
    };

    // Função simplificada que não itera sobre todos os campos
    const handleFormChange = (newData) => {
        // Só atualiza os campos que realmente mudaram
        const changedFields = Object.keys(newData).filter(
            key => JSON.stringify(formData[key]) !== JSON.stringify(newData[key])
        );

        changedFields.forEach(field => {
            handleFieldChange(field, newData[field]);
        });
    };

    if (loading) return <LoadingScreen />;

    console.log("formdata:", formData)

    return (
        <EditForm
            title={title || (isCreateMode ? 'Criar Novo Item' : 'Editar Item')}
            fields={fields}
            formData={formData || {}}
            onFormChange={handleFormChange}
            onSubmit={handleSubmit}
            onBack={() => router.push(redirectPath)}
            isSubmitting={loading}
            mode={mode}
        />
    );
};

export default EditPage;