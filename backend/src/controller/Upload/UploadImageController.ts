import { FastifyReply, FastifyRequest } from "fastify";
import { UploadImageService } from "../../service/Upload/UploadImageService";

interface UploadedFile {
    filename: string;
    mimetype: string;
    size: number;
}

class UploadImageController {
    async handle(request: FastifyRequest, reply: FastifyReply) {
        const file = (request as FastifyRequest & { file: UploadedFile }).file;

        if (!file?.filename) {
            return reply.status(400).send({ message: "No file uploaded" });
        }

        try {
            const uploadImageService = new UploadImageService();
            const uploadImage = await uploadImageService.execute({ file });

            return reply.status(201).send({ uploadImage });
        } catch (error: unknown) {
            const message = error instanceof Error ? error.message : "Unexpected error";
            return reply.status(400).send({ erro: true, message });
        }
    }
}

export { UploadImageController };
