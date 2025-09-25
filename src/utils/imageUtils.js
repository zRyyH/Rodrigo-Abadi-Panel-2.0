export const processFiles = (files, maxImages, currentCount) => {
    const remaining = maxImages - currentCount;
    return Array.from(files)
        .slice(0, remaining)
        .map(file => ({
            id: Date.now() + Math.random(),
            url: URL.createObjectURL(file),
            file
        }));
};

export const getValidIndex = (images, currentIndex) => {
    if (images.length === 0) return 0;
    return Math.min(currentIndex, images.length - 1);
};