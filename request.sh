curl --location 'http://localhost:3000/auth/register' \
--header 'Content-Type: application/json' \
--data-raw '{
    "name": "aJaaohan Doe",
    "phone": "+1a2a3a4a567890",
    "email": "johnaaaadoe@example.com",
    "password": "secaureaapassaword123",
    "img_profile": "https://aexamapalea.com/images/profile.jpg"
}'

curl --location 'http://localhost:3000/auth/login' \
--header 'Content-Type: application/json' \
--data-raw '{
    "email": "johnaaaadoe@example.com",
    "password": "secaureaapassaword123"
}'

curl --location --request POST 'http://localhost:3000/auth/logout' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NzA4YzVhOGVhNjM2MWRhMDRkOGY1ZDAiLCJpYXQiOjE3Mjg2MzE0MTEsImV4cCI6MTcyODYzNTAxMX0.yTcJ0q71lqBO3GPV88qEEQkQ7bLRMrbq25MfUGDOZk4' \
--data ''

curl --location --request POST 'http://localhost:3000/auth/logout' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NzA5MDQyZDA5YjExM2QyN2JiNGE4OTMiLCJpYXQiOjE3Mjg2NDQ1MzgsImV4cCI6MTcyODY0ODEzOH0.U63xjCEAJHrxgvTX7zsu_kamwBMaCdwcP2_havmz_4Y' \
--data ''

curl --location 'http://localhost:3000/api/v1/products' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NzA4YzVhOGVhNjM2MWRhMDRkOGY1ZDAiLCJpYXQiOjE3Mjg2NDQxNDYsImV4cCI6MTcyODY0Nzc0Nn0.XIZA3ELXs01Gl4km6SzJ5wNawrJ1VKzYAzgnDjIb-Ws' \
--data '{
  "userId": "60d5f484f2b1c1b28c4e15a0",
  "name": "Sample Product",
  "description": "This is a sample product.",
  "height": 10,
  "length": 20,
  "width": 15
}'

curl --location --request GET 'http://localhost:3000/api/v1/products' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NzA4YzVhOGVhNjM2MWRhMDRkOGY1ZDAiLCJpYXQiOjE3Mjg2NDQxNDYsImV4cCI6MTcyODY0Nzc0Nn0.XIZA3ELXs01Gl4km6SzJ5wNawrJ1VKzYAzgnDjIb-Ws' \
--data '{
  "userId": "60d5f484f2b1c1b28c4e15a0",
  "name": "Sample Product",
  "description": "This is a sample product.",
  "height": 10,
  "length": 20,
  "width": 15
}'

curl --location --request PUT 'http://localhost:3000/api/v1/products/6708dc73d2f48330d6f2d061' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NzA4YzVhOGVhNjM2MWRhMDRkOGY1ZDAiLCJpYXQiOjE3Mjg2NDQxNDYsImV4cCI6MTcyODY0Nzc0Nn0.XIZA3ELXs01Gl4km6SzJ5wNawrJ1VKzYAzgnDjIb-Ws' \
--data '{
  "userId": "60d5f484f2b1c1b28c4e15a0",
  "name": "Sample Product sample conext",
  "description": "This is a sample product test anotha test",
  "height": 10,
  "length": 20,
  "width": 15
}'

curl --location --request DELETE 'http://localhost:3000/api/v1/products/6708dc73d2f48330d6f2d061' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NzA4YzVhOGVhNjM2MWRhMDRkOGY1ZDAiLCJpYXQiOjE3Mjg2NDQxNDYsImV4cCI6MTcyODY0Nzc0Nn0.XIZA3ELXs01Gl4km6SzJ5wNawrJ1VKzYAzgnDjIb-Ws' \
--data '{
  "userId": "60d5f484f2b1c1b28c4e15a0",
  "name": "Sample Product sample conext",
  "description": "This is a sample product test anotha test",
  "height": 10,
  "length": 20,
  "width": 15
}'

curl --location 'http://localhost:3000/api/v1/products/user/batch' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NzA4YzVhOGVhNjM2MWRhMDRkOGY1ZDAiLCJpYXQiOjE3Mjg2NDQxNDYsImV4cCI6MTcyODY0Nzc0Nn0.XIZA3ELXs01Gl4km6SzJ5wNawrJ1VKzYAzgnDjIb-Ws' \
--data '[
  {
    "userId": "60d5f484f2b1c1b28c4e15a0",
    "name": "Sample Product 1",
    "description": "This is the first sample product.",
    "height": 10,
    "length": 20,
    "width": 15
  },
  {
    "userId": "60d5f484f2b1c1b28c4e15a0",
    "name": "Sample Product 2",
    "description": "This is the second sample product.",
    "height": 12,
    "length": 25,
    "width": 18
  }
]'

curl --location --request DELETE 'http://localhost:3000/api/v1/products/user/batch' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NzA4YzVhOGVhNjM2MWRhMDRkOGY1ZDAiLCJpYXQiOjE3Mjg2NDQxNDYsImV4cCI6MTcyODY0Nzc0Nn0.XIZA3ELXs01Gl4km6SzJ5wNawrJ1VKzYAzgnDjIb-Ws' \
--data '[
    "6708f2399b8df30f8928deca",
    "6708f2399b8df30f8928decb",
    "6708f2399b8df30f8928decc",
    "6708f2399b8df30f8928decd",
    "6708f2399b8df30f8928dece",
    "6708f2399b8df30f8928decf",
    "6708f2399b8df30f8928ded0",
    "6708f2399b8df30f8928ded1",
    "6708f2399b8df30f8928ded2",
    "6708f2399b8df30f8928ded3"
]'

curl --location --request PUT 'http://localhost:3000/api/v1/products/user/batch' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NzA4YzVhOGVhNjM2MWRhMDRkOGY1ZDAiLCJpYXQiOjE3Mjg2NDQxNDYsImV4cCI6MTcyODY0Nzc0Nn0.XIZA3ELXs01Gl4km6SzJ5wNawrJ1VKzYAzgnDjIb-Ws' \
--data '[
    {
        "_id": "6708dc73d2f48330d6f2d061",
        "userId": "6708c5a8ea6361da04d8f5d0",
        "name": "Sample Product update test oscar",
        "description": "This is a sample product.",
        "height": 10,
        "length": 20,
        "width": 15
    },
    {
        "_id": "6708dc74d2f48330d6f2d064",
        "userId": "6708c5a8ea6361da04d8f5d0",
        "name": "Sample Product update test 2",
        "description": "This is a sample product.",
        "height": 10,
        "length": 20,
        "width": 15
    }
]'