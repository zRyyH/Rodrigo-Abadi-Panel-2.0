'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCrudApi } from '@/hooks/useCrudApi';
import { useNotification } from '@/contexts/NotificationContext';
import DynamicForm from '@/components/common/DynamicForm';
import { configs } from '@/constants/pages/files';
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import { DynamicBreadcrumb } from '@/components/common/DynamicBreadcrumb';

export default function UploadFiles() {
    const router = useRouter();
    const { loading, error, uploadFiles, clearError } = useCrudApi('/api/upload');
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

    const handleCancel = () => {
        router.back();
    };

    const isFormValid = values.fileSales && values.fileInvoices;

    return (
        <div className="max-w-4xl mx-auto p-6">
            <DynamicBreadcrumb className="mb-6" />
            
            <Card className="animate-in slide-in-from-bottom-4 duration-500">
                <CardHeader>
                    <CardTitle>Upload de Arquivos</CardTitle>
                </CardHeader>

                <form onSubmit={handleSubmit}>
                    <CardContent className="space-y-6 pb-6">
                        {error && (
                            <Alert variant="destructive">
                                <AlertTitle>Erro</AlertTitle>
                                <AlertDescription>
                                    {error.message || 'Erro ao enviar arquivos'}
                                </AlertDescription>
                            </Alert>
                        )}

                        <DynamicForm
                            fields={configs.fields}
                            values={values}
                            onChange={handleFieldChange}
                        />
                    </CardContent>

                    <Separator />

                    <CardFooter className="flex gap-3 pt-6">
                        <Button
                            type="submit"
                            disabled={loading || !isFormValid}
                        >
                            {loading ? 'Enviando...' : 'Enviar Arquivos'}
                        </Button>

                        <Button
                            type="button"
                            variant="outline"
                            onClick={handleCancel}
                            disabled={loading}
                        >
                            Cancelar
                        </Button>
                    </CardFooter>
                </form>
            </Card>
        </div>
    );
}