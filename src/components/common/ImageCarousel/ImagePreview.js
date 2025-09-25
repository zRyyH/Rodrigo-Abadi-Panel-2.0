import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { X, Upload } from 'lucide-react';

export default function ImagePreview({ image, onRemove, onUpload }) {
    if (!image) {
        return (
            <Card className="aspect-video w-full cursor-pointer" onClick={onUpload}>
                <div className="h-full border-2 border-dashed flex flex-col items-center justify-center">
                    <Upload className="h-8 w-8 mb-2" />
                    <p className="text-sm">Clique para adicionar imagem</p>
                </div>
            </Card>
        );
    }

    return (
        <Card className="aspect-video w-full relative">
            <img src={image.url} className="w-full h-full object-cover rounded" />
            <Button
                size="sm"
                className="absolute top-2 right-2"
                onClick={onRemove}
            >
                <X className="h-4 w-4" />
            </Button>
        </Card>
    );
}