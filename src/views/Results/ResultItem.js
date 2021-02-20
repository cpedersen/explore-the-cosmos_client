import React, { useState, useEffect, useRef } from "react";
import "./Results.css";
import { Link } from "react-router-dom";

const ResultItem = (props) => {
  // Purpose of this component is to provide a way for
  // Search to watch a child element and be informed
  // when it has entered its viewport, so that rendering
  // only happens at that time.

  const { item, onTagClick, fetchVisionTags } = props;
  const { title, nasa_id, keywords, tags } = item.data[0];
  // No tags are being loaded to start
  const [loadingTags, setLoadingTags] = useState(false);
  // Target to observe = containerRef; nothing to observe
  // to start; we're using useRef hook to track a
  // mutable object
  const containerRef = useRef(null);
  // Establishes that there are tags displayed to start
  const fetchTagsInitialized = useRef(false);

  // Get the Google tags after the Search render
  // We need useEffect hook to handle tracking of items
  // through viewport
  useEffect(() => {
    // Set the observer of the target
    let observer = null;
    // Declare options in case we need
    const options = {};
    // Create a function that can be used to track
    // the items as they move through a view
    const intersectionCallback = (entries) => {
      // Get the Google tags/labels only for a single
      // item at a time
      entries.forEach(async (entry) => {
        // If tags are already displayed in this view, then
        // we're good; we can return
        if (fetchTagsInitialized.current) return;
        // Otherwise, load tags and wait to complete; try
        // to disconnect the observer (don't worry if it
        // isn't a clean disconnect)
        if (entry.isIntersecting) {
          setLoadingTags(true);
          fetchTagsInitialized.current = true;
          await fetchVisionTags(nasa_id, item.links?.[0].href);
          setLoadingTags(false);
          observer?.disconnect();
        }
      });
    };

    // This Intersectional Observer provides a way to aynchronously
    // observe changes in the intersection of the item with
    // the Results current viewport
    observer = new IntersectionObserver(intersectionCallback, options);
    observer.observe(containerRef.current);

    return () => {
      // Don't error out if we can't cleanly disconnect
      observer?.disconnect();
    };
  }, [containerRef.current]);

  return (
    <div ref={containerRef} className="item-result" key={nasa_id}>
      <div className="item">{title}</div>
      <div>
        <Link to={`/description/${nasa_id}`}>
          <img
            className="item-result-image"
            src={item.links[0].href}
            alt={title}
          />
        </Link>
      </div>
      <div className="all-tags">
        <div className="tags-nasa">
          <div>
            <b>NASA keywords: </b>
            {keywords?.map((keyword, index) => {
              return (
                <button className="single-nasa-tag" key={index}>
                  <a onClick={(e) => onTagClick(e, keyword)} key={index}>
                    <span>{keyword} </span>
                  </a>
                </button>
              );
            })}
          </div>
          {tags ? (
            <div>
              <b>Google Vision labels:</b>
              {loadingTags ? (
                <p>Loading labels...</p>
              ) : (
                tags.map(({ score, description }, index) => {
                  return (
                    <button
                      className="single-vision-tag"
                      key={`${score}-${index}`}
                    >
                      <a
                        onClick={(e) => onTagClick(e, description)}
                        key={`${description}-${index}`}
                      >
                        {/*{description}: {(score * 100).toFixed(2)}%*/}
                        {description}
                      </a>
                    </button>
                  );
                })
              )}
            </div>
          ) : null}
        </div>
      </div>
      <div>
        <br></br>
      </div>
    </div>
  );
};

export default ResultItem;