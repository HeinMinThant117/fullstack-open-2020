import React from 'react'

const Course = ({ course }) => {
    return (
        <div>
            <Header course={course} />
            <Content course={course} />
            <Total course={course} />
        </div>
    )
}

const Header = ({ course }) => {
    return (
        <h1>{course.name}</h1>
    )
}

const Total = ({ course }) => {
    const exercise = course.parts.map(part => part.exercises)

    const sum = exercise.reduce((sum, num) => sum + num)
    return (
        <p>Number of exercises {sum}</p>
    )
}

const Part = ({ part }) => {
    return (
        <p>
            {part.name} {part.exercises}
        </p>
    )
}

const Content = ({ course }) => {
    return (
        <div>
            {course.parts.map((part, index) =>
                <Part key={part.id} part={part} />
            )}
        </div>
    )
}

export default Course;