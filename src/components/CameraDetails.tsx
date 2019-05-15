import React, { useRef } from "react";

import Button from 'calcite-react/Button';

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
      <Button
        className="btn btn-clear"
        onClick={() => {
          copyJsonButtonClickHandler();
        }}
      >
        Copy JSON
      </Button>

      <form
        action="https://codepen.io/pen/define"
        method="POST"
        target="_blank"
        className="right"
      >
        <input type="hidden" id="formDataCodepen" name="data" value="" />
        <Button
          type="submit"
          className="right"
        >New app at this location</Button>
      </form>
    </div>
  );
}
