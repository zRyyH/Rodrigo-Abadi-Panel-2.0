import { useState, useRef } from 'react';
import { cn } from '@/libs/utils';
import ImagePreview from './components/ImagePreview';
import ImageGallery from './components/ImageGallery';
import FileInput from './components/FileInput';
import { processFiles, adjustSelectedIndex } from './utils/imageUtils';

export default function ImageCarousel({
    images = [],
    onImagesChange,
    maxImages = 5,
    className
}) {
    const [selectedIndex, setSelectedIndex] = useState(0);
    const fileInputRef = useRef(null);

    const handleFileSelect = (event) => {
        const newImages = processFiles(event.target.files, maxImages, images.length);
        onImagesChange([...images, ...newImages]);

        if (images.length === 0 && newImages.length > 0) {
            setSelectedIndex(0);
        }
    };

    const removeImage = (index) => {
        const updatedImages = images.filter((_, i) => i !== index);
        onImagesChange(updatedImages);
        setSelectedIndex(adjustSelectedIndex(selectedIndex, updatedImages.length));
    };

    const openFileDialog = () => fileInputRef.current?.click();

    return (
        <div className={cn("space-y-4", className)}>
            <div className="space-y-2">
                <h3 className="text-sm font-medium text-muted-foreground">Foto</h3>
                <ImagePreview
                    image={images[selectedIndex]}
                    onRemove={() => removeImage(selectedIndex)}
                    onUploadClick={openFileDialog}
                    showUpload={images.length === 0}
                />
            </div>

            <ImageGallery
                images={images}
                selectedIndex={selectedIndex}
                onSelect={setSelectedIndex}
                onUploadClick={openFileDialog}
                maxImages={maxImages}
            />

            <FileInput
                ref={fileInputRef}
                onFileSelect={handleFileSelect}
            />
        </div>
    );
}