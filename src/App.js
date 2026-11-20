import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import TagItem from './components/TagItem'
import TaskItem from './components/TaskItem'
import './App.css'

const tagsList = [
  {
    optionId: 'HEALTH',
    displayText: 'Health',
  },
  {
    optionId: 'EDUCATION',
    displayText: 'Education',
  },
  {
    optionId: 'ENTERTAINMENT',
    displayText: 'Entertainment',
  },
  {
    optionId: 'SPORTS',
    displayText: 'Sports',
  },
  {
    optionId: 'TRAVEL',
    displayText: 'Travel',
  },
  {
    optionId: 'OTHERS',
    displayText: 'Others',
  },
]

class App extends Component {
  state = {
    taskInput: '',
    selectedTag: tagsList[0].optionId,
    tasksList: [],
    activeTag: '',
  }

  onChangeTaskInput = event => {
    this.setState({taskInput: event.target.value})
  }

  onChangeSelectTag = event => {
    this.setState({selectedTag: event.target.value})
  }

  onAddTask = event => {
    event.preventDefault()
    const {taskInput, selectedTag} = this.state

    if (taskInput.trim() !== '') {
      const matchedTag = tagsList.find(
        eachTag => eachTag.optionId === selectedTag,
      )

      const newTask = {
        id: uuidv4(),
        taskName: taskInput,
        tagId: selectedTag,
        tagText: matchedTag ? matchedTag.displayText : selectedTag,
      }

      this.setState(prevState => ({
        tasksList: [...prevState.tasksList, newTask],
        taskInput: '',
        selectedTag: tagsList[0].optionId,
      }))
    }
  }

  onToggleTagFilter = optionId => {
    this.setState(prevState => ({
      activeTag: prevState.activeTag === optionId ? '' : optionId,
    }))
  }

  render() {
    const {taskInput, selectedTag, tasksList, activeTag} = this.state
    const filteredTasksList =
      activeTag === ''
        ? tasksList
        : tasksList.filter(eachTask => eachTask.tagId === activeTag)

    return (
      <div className="app-container">
        <div className="create-task-panel">
          <h1 className="create-task-heading">Create a task!</h1>
          <form className="task-form" onSubmit={this.onAddTask}>
            <div className="input-group">
              <label htmlFor="taskInput" className="input-label">
                Task
              </label>
              <input
                id="taskInput"
                type="text"
                className="task-input"
                placeholder="Enter the task here"
                value={taskInput}
                onChange={this.onChangeTaskInput}
              />
            </div>

            <div className="input-group">
              <label htmlFor="tagsSelect" className="input-label">
                Tags
              </label>
              <select
                id="tagsSelect"
                className="tags-select"
                value={selectedTag}
                onChange={this.onChangeSelectTag}
              >
                {tagsList.map(eachTag => (
                  <option key={eachTag.optionId} value={eachTag.optionId}>
                    {eachTag.displayText}
                  </option>
                ))}
              </select>
            </div>

            <button type="submit" className="add-task-button">
              Add Task
            </button>
          </form>
        </div>

        <div className="display-tasks-panel">
          <h1 className="section-heading">Tags</h1>
          <ul className="tags-list">
            {tagsList.map(eachTag => (
              <TagItem
                key={eachTag.optionId}
                tagDetails={eachTag}
                isActive={activeTag === eachTag.optionId}
                onClickTag={this.onToggleTagFilter}
              />
            ))}
          </ul>

          <h1 className="section-heading">Tasks</h1>
          {filteredTasksList.length === 0 ? (
            <div className="no-tasks-container">
              <p className="no-tasks-text">No Tasks Added Yet</p>
            </div>
          ) : (
            <ul className="tasks-list">
              {filteredTasksList.map(eachTask => (
                <TaskItem key={eachTask.id} taskDetails={eachTask} />
              ))}
            </ul>
          )}
        </div>
      </div>
    )
  }
}

export default App
