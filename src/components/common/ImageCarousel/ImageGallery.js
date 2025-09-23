import { Card } from '@/components/ui/card';
import { Plus } from 'lucide-react';
import { cn } from '@/libs/utils';

export default function ImageGallery({
    images,
    selectedIndex,
    onSelect,
    onUploadClick,
    maxImages
}) {
    const canAddMore = images.length < maxImages;

    return (
        <div className="space-y-2">
            <h3 className="text-sm font-medium text-muted-foreground">Galeria</h3>

            <div className="flex gap-2">
                {images.map((image, index) => (
                    <Card
                        key={image.id}
                        className={cn(
                            "w-16 h-16 cursor-pointer transition-all",
                            selectedIndex === index && "ring-2 ring-primary"
                        )}
                        onClick={() => onSelect(index)}
                    >
                        <img
                            src={image.url}
                            alt={`Miniatura ${index + 1}`}
                            className="w-full h-full object-cover rounded-lg"
                        />
                    </Card>
                ))}

                {canAddMore && (
                    <Card
                        className="w-16 h-16 border-dashed border-2 flex items-center justify-center cursor-pointer hover:bg-accent/50 transition-colors"
                        onClick={onUploadClick}
                    >
                        <Plus className="h-4 w-4 text-muted-foreground" />
                    </Card>
                )}
            </div>

            <p className="text-xs text-muted-foreground">
                {images.length}/{maxImages} imagens
            </p>
        </div>
    );
}