from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import Response
from database import engine
import models

from routes import auth_routes, student_routes, ai_routes

models.Base.metadata.create_all(bind=engine)

app = FastAPI(title="Student Management API", version="2.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "https://fastapi-backend-ashen.vercel.app",
        "https://fastapi-backend.vercel.app",
        "https://pallavi-fastapi-backend.onrender.com",
    ],
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_routes.router)
app.include_router(student_routes.router)
app.include_router(ai_routes.router)

@app.get("/")
def root():
    return {"message": "Student Management API with Authentication"}

# Silences the browser's automatic favicon.ico 404
@app.get("/favicon.ico", include_in_schema=False)
def favicon():
    return Response(status_code=204)