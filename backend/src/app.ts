import fastify from 'fastify';
import cors from '@fastify/cors'
import multipart from '@fastify/multipart';
import fastifyStatic from '@fastify/static';
import zodErrorHandler from "./middleware/zodErrorHandler";
import { routes } from './routes';
import path from 'path'
const app = fastify({ logger: true })

// Register CORS first
app.register(cors, {
  origin: ['http://localhost:8000', 'http://localhost:5173'], // Add your frontend URLs
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}); // Enable CORS

// Register multipart support for file uploads BEFORE routes
app.register(multipart, {
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB
  }
});

// Register Zod error handler
app.register(zodErrorHandler);

// Register API routes LAST
app.register(routes);

// Serve static files from the 'uploads' directory
// This allows serving uploaded files directly via HTTP
app.register(fastifyStatic, {
  root: path.join(__dirname, '..', 'uploads'),
  prefix: '/uploads'
})


export default app;