import { useRef, forwardRef, useImperativeHandle } from 'react';

const FileInput = forwardRef(function FileInput({ onFileSelect }, ref) {
    const inputRef = useRef(null);

    useImperativeHandle(ref, () => ({
        click: () => inputRef.current?.click()
    }));

    return (
        <input
            ref={inputRef}
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={onFileSelect}
        />
    );
});

export default FileInput;