
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database import get_db
from models import Student
from services.ai_service import get_study_recommendations
from utils.dependencies import get_current_user
from models import User

router = APIRouter(prefix="/student", tags=["AI Recommendations"])

@router.get("/{student_id}/study_recommendations")
def study_recommendations(
    student_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    student = db.query(Student).filter(Student.id == student_id, Student.user_id == current_user.id).first()
    if not student:
        raise HTTPException(status_code=404, detail="Student not found")
    recommendations = get_study_recommendations(student.course)
    return {
        "student_id": student_id,
        "course": student.course,
        "recommendations": recommendations
    }
