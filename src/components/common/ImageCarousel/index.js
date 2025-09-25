import { useState, useRef } from 'react';
import ImagePreview from './ImagePreview';
import ImageGallery from './ImageGallery';
import { processFiles, getValidIndex } from '@/utils/imageUtils';

export default function ImageCarousel({ images = [], onImagesChange, deleteImage, maxImages = 5 }) {
    const [selectedIndex, setSelectedIndex] = useState(0);
    const inputRef = useRef(null);

    const handleFileSelect = (e) => {
        const newImages = processFiles(e.target.files, maxImages, images.length);
        const updatedImages = [...images, ...newImages];

        onImagesChange(updatedImages);

        if (images.length === 0 && newImages.length > 0) {
            setSelectedIndex(0);
        }

        e.target.value = '';
    };

    const removeImage = async (index) => {
        const fileId = images[index].directus_files_id

        if (fileId) {
            await deleteImage(images[index].directus_files_id)
        }

        console.log("cabecao grande", images, index)
        const updatedImages = images.filter((_, i) => i !== index);
        onImagesChange(updatedImages);
        setSelectedIndex(getValidIndex(updatedImages, selectedIndex));
    };

    const openFiles = () => inputRef.current?.click();

    return (
        <div className="space-y-4">
            <div>
                <p className="text-sm mb-2">Foto</p>
                <ImagePreview
                    image={images[selectedIndex]}
                    onRemove={() => removeImage(selectedIndex)}
                    onUpload={openFiles}
                />
            </div>

            <ImageGallery
                images={images}
                selectedIndex={selectedIndex}
                onSelect={setSelectedIndex}
                onUpload={openFiles}
                maxImages={maxImages}
            />

            <input
                ref={inputRef}
                type="file"
                accept="image/*"
                multiple
                className="hidden"
                onChange={handleFileSelect}
            />
        </div>
    );
}