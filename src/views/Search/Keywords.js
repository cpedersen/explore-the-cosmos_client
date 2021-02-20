import React, { useState, useEffect } from "react";
import "./Search.css";

const Keywords = (props) => {
  const { keywords, removeKeyword } = props;
  const [activeKeywords, setActiveKeywords] = useState([]);

  useEffect(() => {
    console.log("keywords", keywords);
    // Loop through keywords and create a new array
    // with only active keywords
    const newActiveKeywords = Object.entries(keywords).reduce(
      (acc, [keyword, isActive]) => {
        if (!isActive) return acc;
        acc.push(keyword);
        return acc;
      },
      []
    );
    setActiveKeywords(newActiveKeywords);
  }, [keywords]);

  return (
    <div>
      <span className="keywords-section">Keywords:</span>
      <br />
      {activeKeywords.map((keyword) => {
        return (
          <div>
            <span className="tag" key={keyword}>
              {keyword}
            </span>
            <span>
              <button onClick={(e) => removeKeyword(e, keyword)}>X</button>
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default Keywords;