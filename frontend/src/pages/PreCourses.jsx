import React from 'react'

function PreCourses() {
    return (
        <div>
            <center>
                <h1>Pre-Ph.D Coursework</h1>

                {/* View and edit courses */}
                <button type="button" className="view-students" style={{
                    backgroundColor: '#3498db',
                    color: '#fff',
                    padding: '10px 20px',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer',
                    display: 'block',
                    margin: '20px auto'
                }} onClick={() => window.location.href = '/courses/view'}>View Pre-Ph.D Courseworks</button>

                <button type="button" className="edit-students" style={{
                    backgroundColor: '#2ecc71',
                    color: '#fff',
                    padding: '10px 20px',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer',
                    display: 'block',
                    margin: '20px auto'
                }} onClick={() => window.location.href = '/students/courses'}>View Enrollments</button>

                <button type="button" className="edit-students" style={{
                    backgroundColor: '#2ecc71',
                    color: '#fff',
                    padding: '10px 20px',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer',
                    display: 'block',
                    margin: '20px auto'
                }} onClick={() => window.location.href = '/students/courses/new'}>Enroll New Students</button>

            </center>
        </div>
    )
}

export default PreCourses
