import React, { useEffect, useState } from 'react'

function ViewCourses() {

    const [courses, setCourses] = useState(null);
    const [updating, setUpdating] = useState(null);
    const [updatedCourse, setUpdatedCourse] = useState(null);
    const [addNewCourse, setAddNewCourse] = useState(false);

    useEffect(() => {
        document.title = 'View Courses | PhD Students DMS';
        fetch('http://localhost:5000/courses', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                setCourses(data.courses);
            })
            .catch(err => console.log(err));
    }, []);

    return (
        <div>
            <h1>Pre-Ph.D Courses</h1>

            {/* Add new Course button */}
            <center>
                <button type="button" onClick={() => setAddNewCourse(prev => !prev)} style={{ marginBottom: '30px' }}>{addNewCourse ? 'Close' : 'Show'} Add New Course</button>
            </center>

            {
                addNewCourse && <form onSubmit={(e) => {
                    e.preventDefault();
                    fetch('http://localhost:5000/courses', {
                        method: 'POST',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${localStorage.getItem('token')}`
                        },
                        body: JSON.stringify(updatedCourse)
                    })
                        .then(res => res.json())
                        .then(data => {
                            console.log(data)
                            setCourses(data.courses);
                            setAddNewCourse(false);
                        })
                        .catch(err => console.log(err));
                }}>
                    <input type="text" placeholder="Course Code" onChange={(e) => setUpdatedCourse({ ...updatedCourse, course_code: e.target.value })} />
                    <input type="text" placeholder="Course Name" onChange={(e) => setUpdatedCourse({ ...updatedCourse, course_name: e.target.value })} />
                    <input type="number" style={{ width: '50%' }} placeholder="Course Credits" onChange={(e) => setUpdatedCourse({ ...updatedCourse, course_credits: e.target.value })} />
                    <input type="text" placeholder="Course Type" onChange={(e) => setUpdatedCourse({ ...updatedCourse, course_type: e.target.value })} />
                    <input type="text" placeholder="Course Department" onChange={(e) => setUpdatedCourse({ ...updatedCourse, course_department: e.target.value })} />
                    <button type="submit">Add</button>
                </form>
            }

            <table>
                <thead>
                    <tr>
                        <th>Code</th>
                        <th>Name</th>
                        <th>Credits</th>
                        <th>Description</th>
                        <th>Department</th>
                        <th>Source</th>
                        <th>Mode</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        courses && courses.map((course, index) => {
                            if (updating == course.course_id) {
                                return (
                                    <tr key={course.course_id}>
                                        <td>{course.course_id}</td>
                                        <td><input type="text" value={updatedCourse.course_name} onChange={(e) => setUpdatedCourse({ ...updatedCourse, course_name: e.target.value })} /></td>
                                        <td><input type="text" value={updatedCourse.credits} onChange={(e) => setUpdatedCourse({ ...updatedCourse, credits: e.target.value })} /></td>
                                        <td><input type="text" value={updatedCourse.description} onChange={(e) => setUpdatedCourse({ ...updatedCourse, description: e.target.value })} /></td>
                                        <td><input type="text" value={updatedCourse.department} onChange={(e) => setUpdatedCourse({ ...updatedCourse, department: e.target.value })} /></td>
                                        <td><input type="text" value={updatedCourse.source} onChange={(e) => setUpdatedCourse({ ...updatedCourse, source: e.target.value })} /></td>
                                        <td><input type="text" value={updatedCourse.mode} onChange={(e) => setUpdatedCourse({ ...updatedCourse, mode: e.target.value })} /></td>
                                        <td><button type="submit" onClick={(e) => {
                                            e.preventDefault();
                                            fetch('http://localhost:5000/courses/' + course.course_id, {
                                                method: 'PUT',
                                                headers: {
                                                    'Accept': 'application/json',
                                                    'Content-Type': 'application/json',
                                                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                                                },
                                                body: JSON.stringify(updatedCourse)
                                            })
                                                .then(res => res.json())
                                                .then(data => {
                                                    console.log(data)
                                                    setCourses(data.courses);
                                                    setUpdating(null);
                                                })
                                                .catch(err => console.log(err));
                                        }}>Update</button></td>
                                    </tr>
                                )
                            } else {
                                return (<tr key={course.course_id}>
                                    <td>{course.course_id}</td>
                                    <td><strong>{course.course_name}</strong></td>
                                    <td>{course.credits}</td>
                                    <td>{course.description}</td>
                                    <td>{course.department}</td>
                                    <td>{course.source}</td>
                                    <td>{course.mode}</td>
                                    <td><button onClick={() => { setUpdating(course.course_id); setUpdatedCourse(course) }}>Edit</button></td>
                                </tr>)
                            }
                        })
                    }
                    {
                        !courses || courses.length == 0 && <tr><td colSpan='7'>No Courses Found</td></tr>
                    }
                </tbody>
            </table>
        </div>
    )
}

export default ViewCourses
