import path from 'path';
import fs from 'fs/promises';

interface FileType {
    size: number;
    mimetype: string;
    filename: string;
}

class UploadImageService {
    async execute({ file }: { file: FileType }) {
        try {
            // Validate file size (e.g., max 5MB)
            const maxSize = 5 * 1024 * 1024;
            if (file.size > maxSize) {
                throw new Error("File size exceeds 5MB limit");
            }

            // Validate file type
            const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/avif'];
            if (!allowedTypes.includes(file.mimetype)) {
                throw new Error("Invalid file type. Only JPEG, PNG, WebP, and AVIF are allowed");
            }

            const imageUrl = `http://localhost:8000/uploads/${file.filename}`;

            // Log successful upload
            console.log(`File uploaded successfully: ${file.filename}`);

            return { imageUrl, filename: file.filename };
        } catch (error: unknown) {
            let message = 'Unknown error';

            if (error instanceof Error) {
                message = error.message;
            }

            if (file.filename) {
                await fs.unlink(path.join(__dirname, '..', '..', '..', 'uploads', file.filename))
                    .catch(() => { });
            }

            throw new Error(`File upload failed: ${message}`);
        }

    }
}

export { UploadImageService };