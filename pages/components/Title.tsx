import React, { useState } from 'react';

interface EditableTextProps {
  initialText: string;
  name: string;
}

function EditableText(props: EditableTextProps): JSX.Element {
  const [text, setText] = useState<string>(props.initialText);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  function handleClick(): void {
    setIsEditing(true);
  }

  function handleBlur(): void {
    setIsEditing(false);
  }

  function handleChange(event: React.ChangeEvent<HTMLInputElement>): void {
    setText(event.target.value);
  }

  return isEditing ? (
    <div className={props.name}>
    <input className={props.name + '-input'} title={text} placeholder='' type="text" value={text} onChange={handleChange} onBlur={handleBlur} autoFocus />
    </div>
  ) : (
    <div className={props.name}>
    <span className={props.name} onClick={handleClick}>{text}</span>
    </div>
  );
}

export default EditableText;