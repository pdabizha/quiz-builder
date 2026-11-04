## Run the project

Install dependencies:

npm install
cd backend && npm install
cd ../frontend && npm install
cd ..

Configure environment variables:
- backend/.env
- frontend/.env.local

Run database migrations:

cd backend
npm run migration:run
cd ..

Start the application:

npm run dev