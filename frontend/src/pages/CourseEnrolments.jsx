import React, { useEffect, useState } from 'react'

function CourseEnrolments() {

    const [studentSearch, setStudentSearch] = useState('');
    const [Enrollments, setEnrollments] = useState(null);
    const [studentDetails, setStudentDetails] = useState(null);

    return (
        <div>
            <center>
                <h1>Students Course Enrollments</h1>
                <input type="text" placeholder="Search by Student ID" value={studentSearch} onChange={(e) => setStudentSearch(e.target.value)} />
                <button type="button" className="search-student" style={{
                    backgroundColor: '#3498db',
                    color: '#fff',
                    padding: '10px 20px',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer',
                    display: 'block',
                    margin: '20px auto'
                }} onClick={() => {
                    fetch(`http://localhost:5000/courses/enrollments/${studentSearch}`)
                        .then(res => res.json())
                        .then(data => {
                            setEnrollments(data.course_enrollments);
                            setStudentDetails(data.student);
                        })
                        .catch(err => console.log(err));
                }}>Search</button>
                <br />
                <br />

                {Enrollments && Enrollments.length > 0 ? (
                    <table border="1">
                        <thead>
                            <tr>
                                <th>Student ID</th>
                                <th>Course ID</th>
                                <th>Course Name</th>
                                <th>Enrollment Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Enrollments.map((enrollment, index) => (
                                <tr key={index}>
                                    <td>{enrollment.student_id}</td>
                                    <td>{enrollment.course_id}</td>
                                    <td>{enrollment.course_name}</td>
                                    <td>{enrollment.enrollment_date}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <h2>No Enrollments found</h2>
                )}
            </center>
        </div>
    )
}

export default CourseEnrolments
