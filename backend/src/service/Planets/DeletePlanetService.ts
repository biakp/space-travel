import prismaClient from '../../prisma'
import path from 'path'
import fs from 'fs'

interface UserProps {
    user: {
        userId: string
    }
}

type DeleteRegisterProps = UserProps & { id: string } // Define the type for the delete operation

class DeletePlanetService {
    async execute({ user, id }: DeleteRegisterProps) {
        const registerPlanet = await prismaClient.registeredPlanet.findFirst({
            where: {
                id: id,
                userId: user.userId
            }
        })

        if (!registerPlanet) {
            throw new Error("register Planet not found!")
        }

        await prismaClient.registeredPlanet.delete({
            where: {
                id: id,
                userId: user.userId
            }
        })

        const imageUrl = registerPlanet.imageUrl
        const fileName = path.basename(imageUrl)
        // If the image is the default one, we do not delete it
        // This is to prevent deleting the default image that is used when no image is uploaded
        if (fileName === 'image-default.png') {
            return { message: 'Image default has been preserved' }
        }

        const filePath = path.join(__dirname, '..', '..', '..', 'uploads', fileName)

        fs.unlink(filePath, (err) => {
            if (err) {
                console.log("Failed to delete image file:", err)
            }
        })

        return { message: "Registered Planet deleted" }
    }
}
export { DeletePlanetService }