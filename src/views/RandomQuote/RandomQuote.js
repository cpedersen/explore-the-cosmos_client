import React, { Component } from "react";
import "./RandomQuote.css";
import config from "../../config";

class RandomQuote extends Component {
  state = {
    loading: true,
  };

  componentDidMount() {
    fetch(`${config.REACT_APP_BASE_URL}/api/quote`, {
      mode: "no-cors",
    })
      .then((res) => res.json())
      .then((quote) => {
        this.setState({
          loading: false,
          quote,
        });
      });
  }

  render() {
    const { loading, quote } = this.state;

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

export default RandomQuote;
