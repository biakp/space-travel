import { FastifyReply, FastifyRequest } from "fastify"
import { DeleteImageService } from "../../service/Upload/DeleteImageService"

class DeleteImageController {
    async handle(request: FastifyRequest, reply: FastifyReply) {
        const { imageUrl } = request.query as { imageUrl: string }

        if (!imageUrl) {
            return reply.status(400).send({ error: true, message: "ImageUrl parameter is required!" })
        }

        try {
            const deleteImageService = new DeleteImageService()
            const deleted = await deleteImageService.execute({ imageUrl })

            return reply.status(200).send(deleted)
        } catch (error: unknown) {
            return reply.status(400).send({ erro: true, message: error instanceof Error ? error.message : "Unexpected error" })
        }
    }
}
export { DeleteImageController }