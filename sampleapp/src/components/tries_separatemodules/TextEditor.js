
import { createEditor, Editor } from 'slate'
// Import the Slate components and React plugin.
import React, {useState} from 'react'
import { Slate, Editable, withReact } from 'slate-react'
// Add the initial value.
const initialValue = [
    {
      type: 'paragraph',
      children: [{ text: 'A line of text in a paragraph.' }],
    },
  ]
  
export default function TextEditor() {
    const [editor] = useState(() => withReact(createEditor()))
    // const selectedText = editor.selection ? Editor.string(editor, editor.selection) : "<no selection>";
    const selectedText = Editor.string(editor, editor.selection);
    return (
      <Slate editor={editor} value={initialValue}>
        <Editable 
            // onDragStart = {(e) => }
            // onContextMenu={(e) => console.log(selectedText)}
            // onClick={(e) => console.log(selectedText)}
            // onKeyDown={(e) => console.log(e.key)}
            // onDragStart = {(e) => console.log(e.)}
            // onDragEnd = {(e) => console.log(e.)}
            onChange={(e) => console.log(selectedText.length)}
        />
      </Slate>
    )
  }