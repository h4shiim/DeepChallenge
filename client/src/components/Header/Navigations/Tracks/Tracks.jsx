import React, { useState, useEffect } from 'react';
import Html from '../Learnings/Html'
import './Tracks.css'
import Editor from '@monaco-editor/react';

const OnlineIDE = () => {
  const [code, setCode] = useState(`<!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>DeepChallenge</title>
  </head>
  <body>
      <div>Start your first HTML Lesson</div>
  </body>
  </html>`);
  const [output, setOutput] = useState('');



  const handleCodeChange = (newCode) => {
    setCode(newCode);
  };

  const handleRunClick = () => {
    try {
      // Render the HTML code
      const html = eval(`\`${code}\``);
      // Set the output state to the rendered HTML
      setOutput(html);
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
                     defaultLanguage="html"
                     value={code}
                     onChange={handleCodeChange}
                     theme="vs-dark"
                   />
              <button className='run' onClick={handleRunClick}>Run</button>
              </div>
              <div className="output" style={{ width: '34%' }}>
              {/* <h2>Output</h2> */}
              <div dangerouslySetInnerHTML={{ __html: output }} />
              </div>
              </div>
              );
              };
              
              export default OnlineIDE;