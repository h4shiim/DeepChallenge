import React, { useState, useEffect } from 'react';
import Html from '../Learnings/Html'
import './Tracks.css'
import Editor from '@monaco-editor/react';

const OnlineIDE = () => {
  const [courses, setCourses] = useState([]);
  const [code, setCode] = useState('const test;');
  const [output, setOutput] = useState('');



  const handleCodeChange = (newCode) => {
    setCode(newCode);
  };

  const handleRunClick = () => {
    try {
      const result = eval(code);
      setOutput(JSON.stringify(result, null, 2));
    } catch (error) {
      setOutput(error.message);
    }
  };

  return (
    <div className='track-body' style={{ display: 'flex' }}>
      <div className="learning-tab"style={{ width: '33%', height:'' }}>
        {/* <h2>Courses</h2> */}
              <Html />
              </div>
              <div style={{ width: '33%' }}>
              {/* <h2>Editor</h2> */}
              <Editor
                     width="100%"
                     height="100vh"
                     defaultLanguage="javascript"
                     value={code}
                     onChange={handleCodeChange}
                     theme="vs-dark"
                   />
              <button className='run' onClick={handleRunClick}>Run</button>
              </div>
              <div className="output" style={{ width: '33%' }}>
              {/* <h2>Output</h2> */}
              <pre>{output}</pre>
              </div>
              </div>
              );
              };
              
              export default OnlineIDE;