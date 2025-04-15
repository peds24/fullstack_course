const Course = (props) => {
    const courses = props.course
    return (
      <div>
        {/* Iterate over each course in the courses array */}
        {courses.map(course => (
          <section key={course.id}>
            {/* Display the course name */}
            <h2>{course.name}</h2>
            
            {/* Iterate over each part of the current course */}
            {course.parts.map(part => (
              // Display the part name and the number of exercises
              <p key={part.id}>{part.name} {part.exercises}</p>
            ))}
            
            {/* Calculate and display the total number of exercises for the current course */}
            <p>
              <strong>
                total of {course.parts.reduce((sum, part) => sum + part.exercises, 0)} exercises
              </strong>
            </p>
          </section>
        ))}
      </div>
    )
  }

export default Course