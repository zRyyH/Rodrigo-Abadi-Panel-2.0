export const createImageObject = (file) => ({
    id: Date.now() + Math.random(),
    file,
    url: URL.createObjectURL(file)
});

export const processFiles = (files, maxImages, currentCount) => {
    const remainingSlots = maxImages - currentCount;
    return Array.from(files)
        .slice(0, remainingSlots)
        .map(createImageObject);
};

export const adjustSelectedIndex = (currentIndex, newLength) =>
    currentIndex >= newLength ? Math.max(0, newLength - 1) : currentIndex;