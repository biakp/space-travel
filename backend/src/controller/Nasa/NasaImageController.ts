import { FastifyRequest, FastifyReply } from "fastify";
import { NasaImageService } from "../../service/Nasa/NasaImageService";

class NasaImageController {
    async handle(request: FastifyRequest, reply: FastifyReply) {
        try {
            const service = new NasaImageService();
            const image = await service.fetchImage();

            return reply.status(200).send({ image });
        } catch (error: unknown) {
            const message = error instanceof Error ? error.message : "Unexpected error";
            return reply.status(500).send({ erro: true, message });
        }
    }
}

export { NasaImageController };
