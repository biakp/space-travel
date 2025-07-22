import { FastifyReply, FastifyRequest } from "fastify"
import { DateFilterPlanetsService } from "../../service/Planets/DateFilterPlanetsService"

class DateFilterPlanetsController {
    async handle(request: FastifyRequest, reply: FastifyReply) {
        const { startDate, endDate } = request.query as { startDate: string, endDate: string }
        const { user } = request

        if (!user) {
            return reply.status(400).send({ error: true, message: "User does not exists!" })
        }
        if (!startDate || !endDate) {
            return reply.status(400).send({ error: true, message: "Start date and end date are required!" })
        }
        if (new Date(startDate) > new Date(endDate)) {
            return reply.status(400).send({ error: true, message: "Start date cannot be after end date!" })
        }
        
        try {
            const dateFilterPlanetsService = new DateFilterPlanetsService()
            const dateFiltered = await dateFilterPlanetsService.execute({ endDate, startDate, user })

            reply.status(201).send({ planets: dateFiltered })
        } catch (error: any) {
            return reply.status(400).send({ error: true, message: error.message })
        }
    }

}
export { DateFilterPlanetsController }