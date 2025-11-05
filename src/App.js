import React, { useRef, useEffect } from "react";
import ForceGraph2D from "react-force-graph-2d";

const data = {
  nodes: [
    { id: "root", label: "root", type: "folder" },
    { id: "docs", label: "docs", type: "folder" },
    { id: "notes.md", label: "notes.md", type: "file" },
  ],
  links: [
    { source: "root", target: "docs" },
    { source: "docs", target: "notes.md" },
  ],
};

export default function App() {
  const ref = useRef();

  useEffect(() => {
    setTimeout(() => {
      ref.current?.zoomToFit(400, 40);
    }, 200);
  }, []);

  return (
    <div style={{ height: "100vh", background: "#0b1020" }}>
      <ForceGraph2D
        ref={ref}
        graphData={data}
        backgroundColor="transparent"
        nodeRelSize={6}
        nodeVal={(n) => (n.type === "folder" ? 12 : 6)}
        onNodeClick={(n) => alert(`You clicked: ${n.label || n.id}`)}
        nodeCanvasObject={(node, ctx, scale) => {
          const r = node.type === "folder" ? 12 : 6;
          ctx.beginPath();
          ctx.arc(node.x, node.y, r, 0, 2 * Math.PI);
          ctx.fillStyle = node.type === "folder" ? "#9ad6ff" : "#cbd5e1";
          ctx.shadowBlur = 12;
          ctx.shadowColor = "rgba(140,180,255,0.8)";
          ctx.fill();
          ctx.shadowBlur = 0;

          const label = node.label || node.id;
          const fontSize = 12 / scale;
          ctx.font = `${fontSize}px sans-serif`;
          ctx.textAlign = "center";
          ctx.textBaseline = "top";
          ctx.fillStyle = "rgba(220,230,255,0.95)";
          ctx.fillText(label, node.x, node.y + r + 2);
        }}
        linkColor={() => "rgba(180,200,255,0.35)"}
      />
    </div>
  );
}
