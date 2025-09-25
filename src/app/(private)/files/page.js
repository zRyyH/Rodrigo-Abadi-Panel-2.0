'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCrud } from '@/hooks/useCrudApi';
import { useNotification } from '@/contexts/NotificationContext';
import DynamicForm from '@/components/common/DynamicForm';
import { configs } from '@/constants/pages/files';
import { Button } from "@/components/ui/button";

export default function UploadFiles() {
    const router = useRouter();
    const { uploadedFiles, loading, error, uploadFiles, clearError } = useCrud('/api/upload');
    const { showSuccess, showError } = useNotification();
    const [values, setValues] = useState({});

    const handleFieldChange = (name, value) => {
        setValues(prev => ({ ...prev, [name]: value }));
        if (error) clearError();
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!values.fileSales || !values.fileInvoices) {
            showError('Erro', 'Selecione ambos os arquivos');
            return;
        }

        const formData = new FormData();
        formData.append('fileSales', values.fileSales);
        formData.append('fileInvoices', values.fileInvoices);

        try {
            const result = await uploadFiles(formData);

            if (result) {
                showSuccess('Sucesso', 'Arquivos enviados com sucesso');
                setTimeout(() => router.back(), 1500);
            }
        } catch (err) {
            showError('Erro', err.message || 'Erro ao enviar arquivos');
        }
    };

    return (
        <div className="max-w-2xl mx-auto p-6">
            <h1 className="text-2xl font-bold mb-6">Upload de Arquivos</h1>

            <form onSubmit={handleSubmit} className="space-y-6">
                <DynamicForm
                    fields={configs.fields}
                    values={values}
                    onFieldChange={handleFieldChange}
                />

                <Button type="submit" disabled={loading || !values.fileSales || !values.fileInvoices}>
                    {loading ? 'Enviando...' : 'Enviar Arquivos'}
                </Button>
            </form>
        </div>
    );
}