import React, { useState, useEffect, useRef } from "react";
import "./Results.css";
import "./ResultItem.css";
import { Link } from "react-router-dom";

const getClassNames = (classes) => {
  // Find CSS classes associated with selected tags for the
  // purpose of highlighting the tags
  return Object.entries(classes)
    .filter(([c, a]) => a)
    .map(([c]) => c)
    .join(" ");
};

const ResultItem = (props) => {
  // Provide a way for Search to watch a child element and
  // be informed when it has entered its viewport, so that
  // rendering only happens at that time.

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
  const didFindTags = useRef(false);

  useEffect(() => {
    // We need useEffect hook to handle tracking of items
    // through the viewport.
    // Get the tags after the Search render.

    //console.log("connected: ", nasa_id);

    // Set the observer of the target
    let observer = null;

    // Declare options in case we need them
    const options = {};

    const intersectionCallback = (entries) => {
      // Create a function that can be used to track
      // the items as they move through a view.

      entries.forEach(async (entry) => {
        // Get the Google tags/labels only for a single
        // item at a time.
        // Use for debug:
        /*console.log("intersecting: ", {
          fetchTagsInitialized,
          didFindTags,
          tags,
        });*/

        if (loadingTags) return;
        // If tags are already displayed in this view, then
        // we're good; we can return
        if (fetchTagsInitialized.current && didFindTags.current && tags?.length)
          return;
        // Otherwise, load tags and wait to complete; try
        // to disconnect the observer (don't worry if it
        // isn't a clean disconnect)
        if (entry.isIntersecting) {
          setLoadingTags(true);
          fetchTagsInitialized.current = true;
          const imageTags = await fetchVisionTags(
            nasa_id,
            item.links?.[0].href
          );
          //console.log("found tags?: ", imageTags);
          if (imageTags.length) {
            didFindTags.current = true;
          }
          setLoadingTags(false);
          //console.log("done, disconnecting: ", nasa_id);
          // observer?.disconnect();
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
      //console.log("disconnected: ", nasa_id);
      observer?.disconnect();
    };
  }, [containerRef.current, tags]); // eslint-disable-line react-hooks/exhaustive-deps

  //console.log("keywords: ", props.keywords);

  return (
    <div ref={containerRef} className="item-result" key={nasa_id}>
      <div className="item">
        <b>Title: </b>
        {title}
      </div>
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
            NASA keywords:
            {keywords?.map((keyword, index) => {
              return (
                <button
                  className={getClassNames({
                    "single-nasa-tag": true,
                    selected: Boolean((props.keywords || {})[keyword]),
                  })}
                  key={index}
                >
                  <a // eslint-disable-line  jsx-a11y/anchor-is-valid
                    onClick={(e) => onTagClick(e, keyword)}
                    key={index}
                  >
                    <span>{keyword}</span>
                  </a>
                </button>
              );
            })}
          </div>
          {tags ? (
            <div>
              Google Vision labels:
              {loadingTags ? (
                <p>Loading labels...</p>
              ) : (
                tags.map(({ score, description }, index) => {
                  return (
                    <button
                      className={getClassNames({
                        "single-vision-tag": true,
                        selected: Boolean((props.keywords || {})[description]),
                      })}
                      key={`${score}-${index}`}
                    >
                      <a // eslint-disable-line  jsx-a11y/anchor-is-valid
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
