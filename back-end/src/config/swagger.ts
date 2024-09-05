import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { Express } from 'express';
import dotenv from 'dotenv';

dotenv.config();

// Swagger definition
const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'Your API Title',
            version: '1.0.0',
            description: 'Your API description',
        },
        servers: [
            {
                url:  process.env.APP_URL, // Replace with your server URL
            },
        ],
    },
    apis: ['./src/routes/*.ts'], // Paths to files where API docs are written
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);

export function setupSwagger(app: Express): void {
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
}
