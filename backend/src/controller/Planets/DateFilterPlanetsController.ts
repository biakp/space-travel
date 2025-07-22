import { FastifyReply, FastifyRequest } from "fastify"
import { DateFilterPlanetsService } from "../../service/Planets/DateFilterPlanetsService"

class DateFilterPlanetsController {
    async handle(request: FastifyRequest, reply: FastifyReply) {
        const { startDate, endDate } = request.query as { startDate: string, endDate: string }
        const { user } = request

        if (!user) {
            return reply.status(400).send({ error: true, message: "User does not exists!" })
        }
        
        try {
            const dateFilterPlanetsService = new DateFilterPlanetsService()
            const dateFiltered = await dateFilterPlanetsService.execute({ endDate, startDate, user })

            reply.status(201).send({ planet: dateFiltered })
        } catch (error: any) {
            return reply.status(400).send({ erro: true, message: error.message })
        }
    }

}
export { DateFilterPlanetsController }