import express from 'express';
import productsRouter from './routes/products.routes.js';
import { requestLogger } from './middleware/request-logger.js';
import { notFound, errorHandler } from './middleware/error-handler.js';

const app = express();

app.use(express.json());
app.use(requestLogger);
app.use('/products', productsRouter);

// Unmatched route, then the terminal error handler (must stay last).
app.use(notFound);
app.use(errorHandler);

export default app;
