import { Card } from '@/components/ui/card';
import { Plus } from 'lucide-react';

export default function ImageGallery({ images, selectedIndex, onSelect, onUpload, maxImages }) {
    if (images.length === 0) return null;

    return (
        <div>
            <p className="text-sm mb-2">Galeria</p>
            <div className="flex gap-2">
                {images.map((image, index) => (
                    <Card
                        key={image.id}
                        className={`w-16 h-16 cursor-pointer ${selectedIndex === index ? 'ring-2' : ''}`}
                        onClick={() => onSelect(index)}
                    >
                        <img src={image.url} className="w-full h-full object-cover rounded" />
                    </Card>
                ))}

                {images.length < maxImages && (
                    <Card className="w-16 h-16 border-dashed cursor-pointer" onClick={onUpload}>
                        <div className="h-full flex items-center justify-center">
                            <Plus className="h-4 w-4" />
                        </div>
                    </Card>
                )}
            </div>
            <p className="text-xs mt-1">{images.length}/{maxImages} imagens</p>
        </div>
    );
}