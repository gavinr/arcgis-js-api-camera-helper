import React, { useRef } from "react";

interface CameraProps {
  camera: object;
}
export default function CameraDetails({ camera }: CameraProps) {
  const copyTextArea = useRef<HTMLTextAreaElement>(null);

  function copyJsonButtonClickHandler() {
    if (copyTextArea && copyTextArea.current) {
      copyTextArea.current.focus();
      copyTextArea.current.select();
      document.execCommand("copy");
    }
  }
  return (
    <div className="CameraDetails">
      <textarea
        rows={15}
        cols={50}
        readOnly={true}
        value={JSON.stringify(camera, null, 2)}
        ref={copyTextArea}
      />
      <br />
      <a
        className="btn btn-clear"
        onClick={() => {
          copyJsonButtonClickHandler();
        }}
      >
        Copy JSON
      </a>

      <form
        action="https://codepen.io/pen/define"
        method="POST"
        target="_blank"
        className="right"
      >
        <input type="hidden" id="formDataCodepen" name="data" value="" />
        <input
          type="submit"
          value="New app at this location"
          className="btn right"
        />
      </form>
    </div>
  );
}
