import './Html.css'
import React, { useState } from 'react';

const HTMLContent = [
  {
    id: 1,
    title: "HTML Lesson 1: Introduction to HTML",
    content: "HTML stands for HyperText Markup Language and is used to create the structure and content of a web page. HTML uses tags to define the different elements on a page, such as headings, paragraphs, and lists.",
  },
  {
    id: 2,
    title: "HTML Lesson 2: Creating a Simple HTML Page",
    content: "To create a simple HTML page, you need to start with a basic structure that includes the following tags: <html>, <head>, and <body>. The <html> tag is the root element of the page and contains all the other elements. The <head> section is used for metadata, such as the title of the page, and the <body> section is where you put the actual content of the page.",
  },
  {
    id: 3,
    title: "HTML Lesson 3: HTML Headings",
    content: "HTML headings are used to create different levels of headings for your content. The headings are defined using the <h1> to <h6> tags, with <h1> being the highest level heading and <h6> being the lowest. It is recommended to use headings in a hierarchical manner to create a proper structure for your content.",
  },
];

const Page = ({ currentPage }) => {
  return (
    <div className="html-content">
      <h2>{HTMLContent[currentPage].title}</h2>
      <p>{HTMLContent[currentPage].content}</p>
    </div>
  );
};

const HTMLSlider = () => {
  const [currentPage, setCurrentPage] = useState(0);

  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const nextPage = () => {
    if (currentPage < HTMLContent.length - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className="html-slider">
      <Page currentPage={currentPage} />
      <button onClick={prevPage} disabled={currentPage === 0}>Prev</button>
      <button onClick={nextPage} disabled={currentPage === HTMLContent.length - 1}>Next</button>
    </div>
  );
};

export default HTMLSlider;
