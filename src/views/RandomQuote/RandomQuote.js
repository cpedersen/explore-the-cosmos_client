import React, { Component } from "react";
import "./RandomQuote.css";

class RandomQuote extends Component {
  state = {
    loading: true,
  };

  componentDidMount() {
    fetch("http://localhost:8000/api/quote")
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
          "Loading..."
        ) : (
          <figure>
            <blockquote>"{quote.content}"</blockquote>
            <figcaption>
              <bold>
                <em>- {quote.author}</em>
              </bold>
            </figcaption>
          </figure>
        )}
      </div>
    );
  }
}

export default RandomQuote;
