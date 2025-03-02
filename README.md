## QuantumQuestApp  
 

### **Running Backend App**   

Install the required packages:

```BASH
pip install -r backend/requirements.txt
```  

Create a .env file in the `backend/src` directory:  

```
PROJECT_TITLE="SinghIT Web Application API Service"
APP_VERSION="1.0.0"
ENV="dev"
ALLOWED_ORIGINS=["*"]
POSTGRES_USER="dev"
POSTGRES_PASSWORD="dev"
POSTGRES_SERVER="localhost"
POSTGRES_PORT="5432"
POSTGRES_DB="db"
SECRET_KEY="xxxxxxxxx"
JWT_ALGORITHM="HS256"
ACCESS_TOKEN_EXPIRE_MINS=15
```

Spin up a local postgres server (you can use docker for this, if that works):  

```BASH
docker run -d \
  -p 5432:5432 \
  -e POSTGRES_USER=dev \
  -e POSTGRES_PASSWORD=dev \
  -e POSTGRES_DB=db \
  --name db \
  postgres
```  

Migrate Database Schema:  

```BASH
cd backend/src

alembic upgrade head
```

Start Backend Server in the `backend/src` directory:  

```BASH
cd backend/src

python -m singhit_app.api.server
```

You can access the API Documentation via the browser using `http://localhost:9000/docs`