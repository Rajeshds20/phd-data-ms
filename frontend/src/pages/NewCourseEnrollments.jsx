import React, { useEffect, useState } from 'react'

function NewCourseEnrollments() {

    const [allCourses, setAllCourses] = useState(null);
    const [newEnrollment, setNewEnrollment] = useState({
        student_id: '',
        course_id: ''
    });

    useEffect(() => {
        fetch('http://localhost:5000/courses', {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        })
            .then(res => res.json())
            .then(data => {
                setAllCourses(data.courses);
            })
            .catch(err => console.log(err));
    }, []);

    return (
        <div>

            <center>
                <h1>Enroll New Students</h1>
                <label htmlFor="student_id">Student ID : </label>
                <input type="text" id="student_id" value={newEnrollment.student_id} onChange={(e) => setNewEnrollment({ ...newEnrollment, student_id: e.target.value })} />
                <br />
                <br />
                <label htmlFor="course_id">Course ID : </label>
                <select style={{
                    fontSize: '18px',
                    padding: '5px 10px',
                }} id="course_id" value={newEnrollment.course_id} onChange={(e) => setNewEnrollment({ ...newEnrollment, course_id: e.target.value })}>
                    <option value="">Select Course</option>
                    {allCourses && allCourses.map((course, index) => (
                        <option key={index} value={course.course_id} style={{
                            padding: '5px 10px',
                            fontSize: '18px',
                        }}>{course.course_id + '- ' + course.course_name}</option>
                    ))}
                </select>
                <br />
                <br />
                <button type="button" className="enroll-student" style={{
                    backgroundColor: '#3498db',
                    color: '#fff',
                    padding: '10px 20px',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer',
                    display: 'block',
                    margin: '20px auto'
                }} onClick={() => {
                    fetch('http://localhost:5000/courses/enroll', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(newEnrollment)
                    })
                        .then(res => res.json())
                        .then(data => {
                            if (data.success) {
                                alert('Student Enrolled successfully');
                                setNewEnrollment({
                                    student_id: '',
                                    course_id: ''
                                });
                            } else {
                                alert('Student Enrollment failed');
                            }
                        })
                        .catch(err => console.log(err));
                }}>Add Course to Student</button>
            </center>
        </div>
    )
}

export default NewCourseEnrollments
