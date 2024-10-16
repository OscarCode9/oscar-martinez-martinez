# Oscar Martinez Martinez - E-commerce Backend

This project is a RESTful API for managing products in an e-commerce store.

The RESTful API is available at the following address:

AWS: http://ec2-3-16-55-56.us-east-2.compute.amazonaws.com:3000/

Frontend: http://ec2-3-16-55-56.us-east-2.compute.amazonaws.com:5173/

Email: "default@example.com" 

Password: "secauraeaaaaapassaword123"

## Prerequisites

- Docker
- Docker Compose

## Installation and Execution

1. Clone this repository:
   ```
   git clone https://github.com/OscarCode9/oscar-martinez-martinez.git
   cd oscar-martinez-martinez
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

## Running Tests

To run the project tests, you can use the following command:

```bash
npm run test
```

## API Endpoints

### Authentication

#### Register a new user
- **POST** `/auth/register`
  ```json
  {
    "name": "John Doe",
    "phone": "1234567890",
    "email": "john@example.com",
    "password": "securepassword123",
    "img_profile": "https://example.com/profile.jpg"
  }
  ```

#### Log in
- **POST** `/auth/login`
  ```json
  {
    "email": "john@example.com",
    "password": "securepassword123"
  }
  ```

#### Log out (requires token)
- **POST** `/auth/logout`
  - No request body required. Send the token in the Authorization header:
    ```
    Authorization: Bearer <your_access_token>
    ```

### Products

All product endpoints require authentication (token in the `Authorization: Bearer <token>` header)

#### Get all products
- **GET** `/api/v1/products`

#### Get products by user ID
- **GET** `/api/v1/products/user/:userId`

#### Get a product by ID
- **GET** `/api/v1/products/:productId`

#### Create a new product
- **POST** `/api/v1/products`
  ```json
  {
    "name": "Product Name",
    "description": "Product Description",
    "height": 10,
    "length": 20,
    "width": 15
  }
  ```

#### Update a product
- **PUT** `/api/v1/products/:productId`
  ```json
  {
    "name": "Updated Product Name",
    "description": "Updated Product Description",
    "height": 12,
    "length": 22,
    "width": 18
  }
  ```

#### Delete a product by ID
- **DELETE** `/api/v1/products/:productId`

### Batch Operations

#### Create multiple products
- **POST** `/api/v1/products/user/batch/:userId`
  ```json
  [
    {
      "name": "Product 1",
      "description": "Description 1",
      "height": 10,
      "length": 20,
      "width": 15
    },
    {
      "name": "Product 2",
      "description": "Description 2",
      "height": 12,
      "length": 22,
      "width": 18
    }
  ]
  ```

#### Update multiple products
- **PUT** `/api/v1/products/user/batch/:userId`
  ```json
  [
    {
      "id": "product_id_1",
      "name": "Updated Product 1",
      "description": "Updated Description 1",
      "height": 11,
      "length": 21,
      "width": 16
    },
    {
      "id": "product_id_2",
      "name": "Updated Product 2",
      "description": "Updated Description 2",
      "height": 13,
      "length": 23,
      "width": 19
    }
  ]
  ```

#### Delete multiple products
- **DELETE** `/api/v1/products/user/batch/:userId`
  ```json
  ["product_id_1", "product_id_2", "product_id_3"]
  ```

## Additional Notes

- Access tokens expire after 1 hour.
- Joi is used for request data validation.
- Error handling is centralized to provide consistent responses.
- When using Docker Compose, the API will be available at `http://localhost:3000` and MongoDB at `localhost:27017`.

