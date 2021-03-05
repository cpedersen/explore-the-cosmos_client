import React, { Component } from "react";
import "./SpecificQuote.css";

class SpecificQuote extends Component {
  render() {
    const { loading, quote } = this.props;

    if (!quote) return null;

    return (
      <div className="container-quote">
        {loading ? (
          <div className="container-loading">Loading...</div>
        ) : (
          <figure>
            <blockquote>"{quote.content}"</blockquote>
            <figcaption>
              <span className="author">- {quote.author}</span>
            </figcaption>
          </figure>
        )}
      </div>
    );
  }
}

export default SpecificQuote;
