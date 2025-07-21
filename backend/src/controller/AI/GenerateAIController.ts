// src/controllers/GenerateAIController.ts

import { FastifyReply, FastifyRequest } from "fastify";
import axios from "axios";
import { generateSchema } from "../../schemas/generate.schema";

class GenerateAIController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    try {
      const validatedData = generateSchema.parse(request.body); // Validate the request body against the schema
      const { text } = validatedData;

      const response = await axios.post("http://localhost:11434/api/generate", {
        model: "llama3.2",
        prompt: `Hi Ollama, I would like to ask you for a favor: please improve the following sentence and add more details in a concise way: "${text}".
        I do not want your response to include *any* additional words besides the improved sentence.
        No introductions like "Here is your revised sentence" or anything like that.
        Do you understand? I want a direct response. Only the final result. Nothing else.`,
        stream: false
      });

      reply.send({ response: response.data.response });
    } catch (error: any) {
      // If the error is a Zod validation error, we handle it specifically
      if (error.name === 'ZodError') {
        return reply.status(400).send({
          error: "Validation Error",
          message: "Invalid data",
          details: error.errors.map((err: any) => ({
            field: err.path.join('.'),
            message: err.message
          }))
        });
      }

      console.error("AI generation error:", error);
      reply.status(500).send({ 
        error: "Internal Server Error",
        message: "Error generating text" 
      });
    }
  }
}

export { GenerateAIController };
