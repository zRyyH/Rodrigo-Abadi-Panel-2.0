import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { X, Upload } from 'lucide-react';

export default function ImagePreview({ image, onRemove, onUploadClick, showUpload = false }) {
    if (showUpload) {
        return (
            <Card className="aspect-video w-full">
                <div
                    className="h-full border-2 border-dashed border-primary/50 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:bg-accent/50 transition-colors"
                    onClick={onUploadClick}
                >
                    <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                    <p className="text-sm text-muted-foreground">Clique para adicionar imagem</p>
                </div>
            </Card>
        );
    }

    return (
        <Card className="aspect-video w-full">
            <div className="relative h-full">
                <img
                    src={image?.url}
                    alt="Imagem principal"
                    className="w-full h-full object-cover rounded-lg"
                />
                <Button
                    variant="destructive"
                    size="icon"
                    className="absolute top-2 right-2 h-6 w-6"
                    onClick={onRemove}
                >
                    <X className="h-3 w-3" />
                </Button>
            </div>
        </Card>
    );
}