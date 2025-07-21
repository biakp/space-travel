import { FastifyReply, FastifyRequest } from "fastify"
import { UploadImageService } from "../../service/Upload/UploadImageService";

class UploadImageController {
    async handle(request: FastifyRequest, reply: FastifyReply) {
        const file = (request as any).file

        if (!file.filename) {
            reply.status(400).send({ message: "No file uploaded" })
        }

        try {
            const uploadImageService = new UploadImageService()
            const uploadImage = await uploadImageService.execute({ file })

            reply.status(201).send({ uploadImage })
        } catch (error: any) {
            return reply.status(400).send({ erro: true, message: error.message })
        }
    }
}
export { UploadImageController }