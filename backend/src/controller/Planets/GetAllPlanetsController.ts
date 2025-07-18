import { FastifyReply, FastifyRequest } from "fastify"
import { GetAllPlanetsService } from "../../service/Planets/GetAllPlanetsService";

class GetAllPlanetsController {
    async handle(request: FastifyRequest, reply: FastifyReply) {
        const { user } = request;

        if (!user) {
            throw new Error('User does not exists!')
        }

        try {
            const getAllPlanetsService = new GetAllPlanetsService()
            const getAllPlanets = await getAllPlanetsService.execute({ user })

            reply.status(200).send(getAllPlanets)
        } catch (error: any) {
            return reply.status(400).send({ erro: true, message: error.message })
        }
    }
}
export { GetAllPlanetsController }