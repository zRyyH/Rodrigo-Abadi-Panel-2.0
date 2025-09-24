import { Card, CardContent } from '@/components/ui/card';
import DynamicForm from '@/components/common/DynamicForm';
import ImageCarousel from '@/components/common/ImageCarousel';
import { useFileUpload } from '@/hooks/useFileUpload';
import { EditHeader } from './EditHeader';
import { EditActions } from './EditActions';
import { settings } from "@/constants/config";

export const EditForm = ({
    title,
    fields,
    formData,
    onFormChange,
    onSubmit,
    onBack,
    isSubmitting,
    mode = 'edit'
}) => {
    const { uploadFiles, isUploading } = useFileUpload();

    // Formatar gallery para o ImageCarousel
    const formatGalleryImages = (gallery) => {
        if (!gallery || !Array.isArray(gallery)) return [];
        return gallery.map(item => ({
            id: item.directus_files_id,
            url: `${settings.directus_url}/assets/${item.directus_files_id}`
        }));
    };

    // Handler para upload de imagens
    const handleImageUpload = async (files) => {
        try {
            const uploadedFiles = await uploadFiles(files);
            const currentGallery = formData.gallery || [];
            const newGalleryItems = uploadedFiles.map(file => ({
                directus_files_id: file.id
            }));

            onFormChange({
                ...formData,
                gallery: [...currentGallery, ...newGalleryItems]
            });
        } catch (error) {
            console.error('Erro no upload:', error);
        }
    };

    // Handler para mudanças na galeria
    const handleGalleryChange = (newImages) => {
        const newGallery = newImages.map(img => ({
            directus_files_id: img.id
        }));
        onFormChange({
            ...formData,
            gallery: newGallery
        });
    };

    // Separar campos normais dos de imagem
    const normalFields = fields.filter(f => f.type !== 'images');
    const hasImageField = fields.some(f => f.type === 'images');

    return (
        <div className="container mx-auto p-6 max-w-2xl">
            <Card>
                <EditHeader title={title} onBack={onBack} />
                <CardContent>
                    <div className="space-y-6">
                        {/* Campos normais */}
                        <DynamicForm
                            fields={normalFields}
                            values={formData}
                            onFieldChange={(fieldName, value) => {
                                onFormChange({
                                    ...formData,
                                    [fieldName]: value
                                });
                            }}
                        />

                        {/* Campo de imagens */}
                        {hasImageField && (
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Galeria de Imagens</label>

                                <input
                                    type="file"
                                    multiple
                                    accept="image/*"
                                    onChange={async (e) => {
                                        const files = Array.from(e.target.files);
                                        if (files.length) {
                                            await handleImageUpload(files);
                                            e.target.value = '';
                                        }
                                    }}
                                    disabled={isUploading}
                                    className="mb-4 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                                />

                                <ImageCarousel
                                    images={formatGalleryImages(formData.gallery)}
                                    onImagesChange={handleGalleryChange}
                                    maxImages={10}
                                />

                                {isUploading && (
                                    <p className="text-sm text-blue-600">Enviando imagens...</p>
                                )}
                            </div>
                        )}
                    </div>

                    <EditActions
                        isSubmitting={isSubmitting || isUploading}
                        onSubmit={onSubmit}
                        disabled={isUploading}
                        mode={mode}
                    />
                </CardContent>
            </Card>
        </div>
    );
};