import { FastifyReply, FastifyRequest } from "fastify"
import { SearchPlanetsService } from "../../service/Planets/SearchPlanetsService";

class SearchPlanetsController {
  async handle(request: FastifyRequest, reply: FastifyReply) { // Extract the query parameter and user from the request
    const { query } = request.query as { query: string }
    const { user } = request;

    if (!user) {
      throw new Error('User does not exists!')
    }

    try {
      const searchPlanetsService = new SearchPlanetsService()
      const searchPlanets = await searchPlanetsService.execute({ query, user }) // Call the service to search for planets

      reply.status(200).send(searchPlanets) // Send the found planets as a response

    } catch (error: any) {
      return reply.status(400).send({ erro: true, message: error.message }) // Handle errors during planet search
    }
  }

}
export { SearchPlanetsController }