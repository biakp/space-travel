import fastify from 'fastify';
import { routes } from './routes';
import fastifyMultipart from '@fastify/multipart';
import cors from '@fastify/cors'
import fastifyStatic from '@fastify/static';
import zodErrorHandler from "./middleware/zodErrorHandler";
import path from 'path'

const app = fastify({ logger: true })

app.register(fastifyMultipart); // Register multipart support for file uploads
app.register(routes); // Register API routes
app.register(cors, {
  origin: ['http://localhost:8000', 'http://localhost:5173'], // Add your frontend URLs
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}); // Enable CORS
app.register(zodErrorHandler); // Register Zod error handler

// Serve static files from the 'uploads' directory
// This allows serving uploaded files directly via HTTP
app.register(fastifyStatic, {
  root: path.join(__dirname, '..', 'uploads'),
  prefix: '/uploads'
})


export default app;