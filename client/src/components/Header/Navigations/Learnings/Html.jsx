import React, { useState } from 'react';
import './Html.css';

const HTMLContent = [
  {
    id: 1,
    title: "HTML Lesson 1: Introduction to HTML",
    content: "HTML stands for HyperText Markup Language and is used to create the structure and content of a web page. HTML uses tags to define the different elements on a page, such as headings, paragraphs, and lists.",
    task: "Create a simple HTML page with a heading, a paragraph, and a list."
  },
  {
    id: 2,
    title: "HTML Lesson 2: Creating a Simple HTML Page",
    content: "To create a simple HTML page, you need to start with a basic structure that includes the following tags: <html>, <head>, and <body>. The <html> tag is the root element of the page and contains all the other elements. The <head> section is used for metadata, such as the title of the page, and the <body> section is where you put the actual content of the page.",
    task: "Add a title to your HTML page and a link to an external stylesheet."
  },
  {
    id: 3,
    title: "HTML Lesson 3: HTML Headings",
    content: "HTML headings are used to create different levels of headings for your content. The headings are defined using the <h1> to <h6> tags, with <h1> being the highest level heading and <h6> being the lowest. It is recommended to use headings in a hierarchical manner to create a proper structure for your content.",
    task: "Add two more headings to your HTML page with different levels."
  },
  {
    id: 4,
    title: "HTML Lesson 4: HTML Paragraphs",
    content: "HTML paragraphs are used to organize and structure content on a web page. To create a paragraph in HTML, use the <p> tag. By default, each paragraph is separated by a blank line.",
    task: "Add another paragraph to your HTML page with some text."
  },
  {
    id: 5,
    title: "HTML Lesson 5: HTML Lists",
    content: "HTML lists are used to group related items together. There are two types of lists in HTML: ordered lists and unordered lists. Ordered lists are created using the <ol> tag and unordered lists are created using the <ul> tag.",
    task: "Add a list to your HTML page with at least three items."
  },
  {
    id: 6,
    title: "HTML Lesson 6: HTML Links",
    content: "HTML links are used to create clickable links between pages or to other resources, such as images or files. To create a link in HTML, use the <a> tag and specify the URL of the destination in the href attribute.",
    task: "Add a link to your HTML page that opens in a new tab."
  },
  {
    id: 7,
    title: "HTML Lesson 7: HTML Images",
    content: "HTML images are used to display pictures or graphics on a web page. To insert an image in HTML, use the <img> tag and specify the location of the image file in the src attribute.",
    task: "Add an image to your HTML page with a caption."
  },
];

const Page = ({ currentPage }) => {
  return (
    <div className="html-content">
      <h2>{HTMLContent[currentPage].title}</h2>
      <p>{HTMLContent[currentPage].content}</p>
      <h3>Task:</h3> "Add two more headings to your HTML page with different levels."
<p>{HTMLContent[currentPage].task}</p>
</div>
);
};

const Html = () => {
const [currentPage, setCurrentPage] = useState(0);

const handlePrevClick = () => {
setCurrentPage(currentPage => currentPage - 1);
};

const handleNextClick = () => {
setCurrentPage(currentPage => currentPage + 1);
};

return (
<div className="html-container">
<Page currentPage={currentPage} />
<div className="html-buttons">
<button onClick={handlePrevClick} disabled={currentPage === 0}>Prev</button>
<button onClick={handleNextClick} disabled={currentPage === HTMLContent.length - 1}>Next</button>
</div>
</div>
);
};

export default Html;