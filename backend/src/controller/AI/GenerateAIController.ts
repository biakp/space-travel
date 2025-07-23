import { FastifyReply, FastifyRequest } from "fastify";
import axios from "axios";
import { generateSchema } from "../../schemas/generate.schema";

class GenerateAIController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { text } = generateSchema.parse(request.body); // Zod validation

      const response = await axios.post("http://localhost:11434/api/generate", {
        model: "llama3.2",
        prompt: `Hi Ollama, I would like to ask you for a favor: please improve the following sentence and add more details in a concise way: "${text}".
        I do not want your response to include *any* additional words besides the improved sentence.
        No introductions like "Here is your revised sentence" or anything like that.
        Do you understand? I want a direct response. Only the final result. Nothing else.`,
        stream: false
      });

      reply.send({ response: response.data.response });
    } catch (error: unknown) {
      console.error("AI generation error:", error);

      const message = error instanceof Error ? error.message : "Unknown error";
      reply.status(500).send({
        error: "Internal Server Error",
        message
      });
    }
  }
}

export { GenerateAIController };
