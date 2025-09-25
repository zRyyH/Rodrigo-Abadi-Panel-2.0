'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCrud } from '@/hooks/useCrudApi';
import { useNotification } from '@/contexts/NotificationContext';
import DynamicForm from '@/components/common/DynamicForm';
import { configs } from '@/constants/pages/sales';

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

                <button
                    type="submit"
                    disabled={loading || !values.fileSales || !values.fileInvoices}
                    className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                    {loading ? 'Enviando...' : 'Enviar Arquivos'}
                </button>
            </form>
        </div>
    );
}