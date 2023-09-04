const Total = (props) => {
    const totalSum = props.course.parts.reduce((sum, current) => current.exercises + sum, 0);
    return (
            <strong>total of {totalSum} exercises</strong>
    )
}

export default Total