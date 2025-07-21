import path from 'path'
import fs from 'fs'

class DeleteImageService {
    async execute({ imageUrl }: { imageUrl: string }) {
        const fileName = path.basename(imageUrl)

        // Check if the file is the default image
        if (fileName === 'bingusplanet.avif') {
            return { message: 'Image default has been preserved' }
        }

        const filePath = path.join(__dirname, '..', '..', '..', 'uploads', fileName)

        if (fs.existsSync(filePath)) {
            // Delete the file
            fs.unlinkSync(filePath)
            return { message: 'Image deleted successfuly' }
        } else {
            return { error: true, message: "Image not found" }
        }
    }
}
export { DeleteImageService }