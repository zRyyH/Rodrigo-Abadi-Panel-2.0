"use client";

import { Button } from '@/components/ui/button';
import { X, Upload, FileText } from 'lucide-react';

export const FileField = ({ value, onChange, disabled, accept, name }) => {
    const inputId = `file-${name}`;

    const handleFileChange = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            onChange(file);
            e.target.value = ''; // Permite selecionar o mesmo arquivo novamente
        }
    };

    return (
        <div className="space-y-2">
            <div className="flex items-center gap-2">
                <input
                    id={inputId}
                    type="file"
                    accept={accept}
                    onChange={handleFileChange}
                    disabled={disabled}
                    className="hidden"
                />
                <Button
                    type="button"
                    variant="outline"
                    disabled={disabled}
                    onClick={() => document.getElementById(inputId)?.click()}
                >
                    <Upload className="h-4 w-4 mr-2" />
                    Selecionar arquivo
                </Button>
                {value && (
                    <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        onClick={() => onChange(null)}
                        disabled={disabled}
                    >
                        <X className="h-4 w-4" />
                    </Button>
                )}
            </div>
            {value && (
                <div className="flex items-center gap-2 p-2 bg-muted rounded-md">
                    <FileText className="h-4 w-4" />
                    <span className="text-sm text-muted-foreground">
                        {value.name}
                    </span>
                </div>
            )}
        </div>
    );
};