from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import create_engine, Column, Integer, String
from sqlalchemy.orm import sessionmaker
from sqlalchemy.orm import declarative_base
from pydantic import BaseModel
from typing import Optional
import bcrypt
import os
import uvicorn

# Create a FastAPI instance
app = FastAPI()

# Set up CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow requests from any origin (you may want to restrict this in production)
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE"],
    allow_headers=["*"],
)

# Ensure that the database directory exists
if not os.path.exists("database"):
    os.makedirs("database")

# Set up the SQLite database engine
engine = create_engine('sqlite:///database/database.db')
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Define database models
Base = declarative_base()

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, index=True)
    email = Column(String, unique=True, index=True)
    hashed_password = Column(String)

# Create database tables
Base.metadata.create_all(bind=engine)

# Pydantic model for signup
class UserCreate(BaseModel):
    username: str
    email: str
    password: str

# Pydantic model for signin
class SignInRequest(BaseModel):
    email: str
    password: str

# Root endpoint
@app.get("/")
async def root():
    return {"message": "Welcome to BryApp"}

# Signup endpoint
@app.post("/signup/")
async def signup(user: UserCreate):
    db = SessionLocal()
    db_user = db.query(User).filter(User.email == user.email).first()
    if db_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    
    hashed_password = bcrypt.hashpw(user.password.encode('utf-8'), bcrypt.gensalt())
    db_user = User(username=user.username, email=user.email, hashed_password=hashed_password.decode('utf-8'))
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    db.close()
    return {"message": "User registered successfully"}

# Signin endpoint
@app.post("/signin/")
async def signin(signin_request: SignInRequest):
    db = SessionLocal()
    db_user = db.query(User).filter(User.email == signin_request.email).first()
    db.close()
    if not db_user or not bcrypt.checkpw(signin_request.password.encode('utf-8'), db_user.hashed_password.encode('utf-8')):
        raise HTTPException(status_code=401, detail="Invalid email or password")
    return {"message": "Sign in successful", "username": db_user.username}


if __name__ == "__main__":

    PORT = 8000
    
    # Run the FastAPI application using uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=PORT, reload=True)
