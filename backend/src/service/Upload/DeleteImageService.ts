import path from 'path'
import fs from 'fs'

class DeleteImageService {
    async execute({ imageUrl }: { imageUrl: string }) {
        const fileName = path.basename(imageUrl)

        // Check if the file is the default image
        if (fileName === 'bingusplanet.avif') {
            return { message: 'Image default has been preserved' }
        }

        const filePath = path.join(__dirname, '..', '..', '..', 'uploads', fileName) // Adjust the path as necessary

        if (fs.existsSync(filePath)) { // Check if the file exists
            // Delete the file
            fs.unlinkSync(filePath)
            return { message: 'Image deleted successfuly' }
        } else {
            return { error: true, message: "Image not found" }
        }
    }
}
export { DeleteImageService }