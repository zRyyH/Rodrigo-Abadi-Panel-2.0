import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { X, Plus, Upload } from 'lucide-react';
import { cn } from '@/libs/utils';

export default function ImageUpload({
    images = [],
    onImagesChange,
    maxImages = 5,
    className
}) {
    const [selectedIndex, setSelectedIndex] = useState(0);
    const fileInputRef = useRef(null);

    const handleFileSelect = (event) => {
        const files = Array.from(event.target.files);
        const remainingSlots = maxImages - images.length;
        const filesToAdd = files.slice(0, remainingSlots);

        const newImages = filesToAdd.map(file => ({
            id: Date.now() + Math.random(),
            file,
            url: URL.createObjectURL(file)
        }));

        onImagesChange([...images, ...newImages]);

        if (images.length === 0 && newImages.length > 0) {
            setSelectedIndex(0);
        }
    };

    const removeImage = (index) => {
        const newImages = images.filter((_, i) => i !== index);
        onImagesChange(newImages);

        if (selectedIndex >= newImages.length) {
            setSelectedIndex(Math.max(0, newImages.length - 1));
        }
    };

    const canAddMore = images.length < maxImages;

    return (
        <div className={cn("space-y-4", className)}>
            <div className="space-y-2">
                <h3 className="text-sm font-medium text-muted-foreground">Foto</h3>
                <Card className="aspect-video w-full">
                    {images.length > 0 ? (
                        <div className="relative h-full">
                            <img
                                src={images[selectedIndex]?.url}
                                alt="Imagem principal"
                                className="w-full h-full object-cover rounded-lg"
                            />
                            <Button
                                variant="destructive"
                                size="icon"
                                className="absolute top-2 right-2 h-6 w-6"
                                onClick={() => removeImage(selectedIndex)}
                            >
                                <X className="h-3 w-3" />
                            </Button>
                        </div>
                    ) : (
                        <div
                            className="h-full border-2 border-dashed border-primary/50 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:bg-accent/50 transition-colors"
                            onClick={() => fileInputRef.current?.click()}
                        >
                            <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                            <p className="text-sm text-muted-foreground">Clique para adicionar imagem</p>
                        </div>
                    )}
                </Card>
            </div>

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
                            onClick={() => setSelectedIndex(index)}
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
                            onClick={() => fileInputRef.current?.click()}
                        >
                            <Plus className="h-4 w-4 text-muted-foreground" />
                        </Card>
                    )}
                </div>

                <p className="text-xs text-muted-foreground">
                    {images.length}/{maxImages} imagens
                </p>
            </div>

            <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                multiple
                className="hidden"
                onChange={handleFileSelect}
            />
        </div>
    );
}