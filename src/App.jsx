import React, { useEffect } from "react";
import app from "./firebase";
import { getApp } from "firebase/app";

function App() {
  useEffect(() => {
    const firebaseApp = getApp();
    console.log("✅ Firebase connected:", firebaseApp.options.projectId);
  }, []);

  return (
    <div>
      <h1>Firebase Test</h1>
      <p>Check the console for connection status.</p>
    </div>
  );
}

export default App;