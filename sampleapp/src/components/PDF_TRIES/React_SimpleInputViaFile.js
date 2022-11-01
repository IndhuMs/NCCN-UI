import React from "react";
export default function ReactSimplePDFInput() {
    const onChangeHandler = (event) => {
        console.log(event.target.files[0])
    }
    return (
        <div>
             <input type="file" name="file" onChange={onChangeHandler}/>
        </div>
    )
}