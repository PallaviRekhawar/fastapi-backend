
def get_study_recommendations(course_name: str) -> str:
    # Enhanced mock recommendations based on course
    course_lower = course_name.lower()
    if "computer" in course_lower or "cs" in course_lower:
        return """1. Master Data Structures & Algorithms
2. Learn Python and SQL
3. Build a web or mobile project
4. Practice coding on LeetCode"""
    elif "mech" in course_lower:
        return """1. Strengthen Thermodynamics & Mechanics
2. Learn CAD software (SolidWorks, AutoCAD)
3. Study Material Science
4. Work on a mini project (e.g., a small engine model)"""
    elif "it" in course_lower:
        return """1. Understand networking basics
2. Learn database management
3. Get familiar with cloud platforms (AWS, Azure)
4. Build an IT support or automation project"""
    else:
        return f"""1. Deepen your understanding of {course_name} fundamentals
2. Build a hands-on project related to {course_name}
3. Explore advanced topics in {course_name}
4. Join relevant online communities and forums"""
