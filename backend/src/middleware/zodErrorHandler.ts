import { FastifyPluginAsync } from "fastify";
import { ZodError } from "zod";

const zodErrorHandler: FastifyPluginAsync = async (fastify) => {
  fastify.setErrorHandler((error, request, reply) => {
    if (error instanceof ZodError) {
      return reply.status(400).send({
        error: "Validation Error",
        message: "Invalid data",
        details: error.issues.map(issue => ({
          field: issue.path.join('.'),
          message: issue.message,
        })),
      });
    }

    // fallback for other errors
    const message = error instanceof Error ? error.message : "Internal Server Error";

    reply.status(500).send({
      error: "Internal Server Error",
      message,
    });
  });
};

export default zodErrorHandler;
