## Hosted At https://docutalker.vercel.app/
## Installation Guidelines
## git clone https://github.com/saubhagyasenapati/docutalker.git
## cd docutalker
## npm install
## ENV 
## create a .env in root directory where public src is present
## APIKEY REQUIRED in ROOT DIRECTORY are
### //Clerk Keys
### NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=*****
### CLERK_SECRET_KEY=***
### NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
### NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
### NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
### NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/
### //NeonDB
### DATABASE_URL=****(Curently NeonDB is used so api key of neon db)
### //AWS KEYS
### NEXT_PUBLIC_S3_AWS_ACCESS_KEY_ID=****
### NEXT_PUBLIC_S3_AWS_SECRET_ACCESS_KEY=***
### NEXT_PUBLIC_S3_BUCKET_NAME=***
### //PineConeDB for embedding and vectorization of pdf 
### PINECONE_ENVIRONMENT=***
### PINECONE_API_KEY=***
## //OpenAI API
### OPENAI_API_KEY=***
## Last Step
### npm run dev 
## Read to conquer the world with Your AI Document Companion
