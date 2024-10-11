# Oscar Martinez Martinez - E-commerce Backend

This project is a RESTful API for managing products in an e-commerce store.

## Prerequisites

- Docker
- Docker Compose

## Installation and Execution

1. Clone this repository:
   ```
   git clone https://github.com/your-username/alejandro-de-la-cruz-martinez.git
   cd alejandro-de-la-cruz-martinez
   ```

2. Build and start the services using Docker Compose:
   ```
   docker-compose up --build
   ```

   This command will start both the API and the MongoDB database.

3. To stop the services, use:
   ```
   docker-compose down
   ```

   If you want to remove the MongoDB data volume as well, use:
   ```
   docker-compose down -v
   ```

## Docker Compose Configuration

The `docker-compose.yml` file is configured as follows:

```yaml
version: '3.8'

services:
  api:
    build: .
    ports:
      - "3000:3000"
    depends_on:
      - mongodb
    environment:
      - MONGODB_URI=mongodb://mongodb:27017/ecommerce
      - JWT_SECRET=your_jwt_secret
      - PORT=3000
    networks:
      - app-network

  mongodb:
    image: mongo:4.4
    ports:
      - "27017:27017"
    volumes:
      - mongodb_data:/data/db
    networks:
      - app-network

networks:
  app-network:
    driver: bridge

volumes:
  mongodb_data:
```

This file defines two services:

1. `api`: Our Node.js application
   - Built using the Dockerfile in the current directory.
   - Exposes port 3000.
   - Depends on the `mongodb` service.
   - Has environment variables configured for MongoDB connection and JWT secret.

2. `mongodb`: MongoDB database
   - Uses the official MongoDB 4.4 image.
   - Exposes port 27017.
   - Uses a volume to persist data.

Both services are connected to the `app-network`, allowing communication between them.

## API Endpoints

### Authentication

- POST /auth/register - Register a new user
- POST /auth/login - Log in
- POST /auth/logout - Log out (requires token)

### Products

All product endpoints require authentication (token in the `Authorization: Bearer <token>` header)

- GET /api/v1/products - Get all products
- GET /api/v1/products/:userId - Get products by user ID
- GET /api/v1/products/:productId - Get a product by ID
- POST /api/v1/products - Create a new product
- PUT /api/v1/products/:productId - Update a product
- DELETE /api/v1/products/:productId - Delete a product by ID

### Batch Operations

- POST /api/v1/products/user/batch - Create multiple products
- PUT /api/v1/products/user/batch - Update multiple products
- DELETE /api/v1/products/user/batch - Delete multiple products

## Additional Notes

- Access tokens expire after 1 hour.
- Joi is used for request data validation.
- Error handling is centralized to provide consistent responses.
- When using Docker Compose, the API will be available at `http://localhost:3000` and MongoDB at `localhost:27017`.