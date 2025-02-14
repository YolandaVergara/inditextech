import { useState } from "react";
import RowsManager from "./RowsManager";
import "./EditorContainer.css";

const EditorContainer = () => {
  const [zoom, setZoom] = useState(1);

  const handleZoomIn = () => {
    setZoom((prevZoom) => Math.min(prevZoom + 0.1, 1));
  };

  const handleZoomOut = () => {
    setZoom((prevZoom) => Math.max(prevZoom - 0.1, 0.4));
  };

  return (
    <div className="editor-container">
      <div className="zoom-controls">
        <button onClick={handleZoomOut} disabled={zoom <= 0.4}>➖ Zoom Out</button>
        <button onClick={handleZoomIn} disabled={zoom >= 1}>➕ Zoom In</button>
      </div>

      <div className="editor-wrapper">
        <div className="editor" style={{ transform: `scale(${zoom})` }}>
          <RowsManager />
        </div>
      </div>
    </div>
  );
};

export default EditorContainer;
