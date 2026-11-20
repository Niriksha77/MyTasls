import './index.css'

const TagItem = props => {
  const {tagDetails, isActive, onClickTag} = props
  const {optionId, displayText} = tagDetails
  const buttonClassName = isActive ? 'tag-button active-tag' : 'tag-button'

  const onSelectTag = () => {
    onClickTag(optionId)
  }

  return (
    <li className="tag-item">
      <button type="button" className={buttonClassName} onClick={onSelectTag}>
        {displayText}
      </button>
    </li>
  )
}

export default TagItem
