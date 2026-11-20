import './index.css'

const TaskItem = props => {
  const {taskDetails} = props
  const {taskName, tagText} = taskDetails

  return (
    <li className="task-item">
      <p className="task-name">{taskName}</p>
      <p className="task-tag-badge">{tagText}</p>
    </li>
  )
}

export default TaskItem
