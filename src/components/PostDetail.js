import React, { Component } from "react";
import { Converter } from "react-showdown";
import Button from "react-bootstrap/Button";
import SteemConnect from "../apis/SteemConnect";

class PostDetail extends Component {
  constructor(props) {
    super(props);
    this.access_token = new URLSearchParams(document.location.search).get(
      "access_token"
    );
    SteemConnect.setAccessToken(this.access_token);
  }

  calculatePostUrl = steemitUrl => {
    return `${steemitUrl}${this.props.post.url}`;
  };

  calculateAuthorUrl = steemitUrl => {
    return `${steemitUrl}/@${this.props.post.author}`;
  };

  comment = () => {
    SteemConnect.comment(
      "eaudebla",
      "crowthelegendvrreview-mdnmolwle9",
      "eaudebla",
      "re-crowthelegendvrreview-mdnmolwle9",
      "",
      "this is a test",
      "",
      function(err, res) {
        console.log(err, res);
      }
    );
  };

  renderPost() {
    if (!this.props.post) {
      return (
        <div className="post-detail">
          <h2>Click on a post to your left.</h2>
        </div>
      );
    } else {
      const steemitUrl = "https://steemit.com";
      const postUrl = this.calculatePostUrl(steemitUrl);
      const authorUrl = this.calculateAuthorUrl(steemitUrl);
      let converter = new Converter({ simpleLineBreaks: true });
      let reactElement = converter.convert(this.props.post.body);

      return (
        <div className="post-detail">
          <h1>{this.props.post.title}</h1>
          <ul>
            <li>
              by <a href={authorUrl}>{this.props.post.author}</a> on
              {this.props.post.created}
            </li>
            <li>
              <b>Payout value:</b> {this.props.post.pending_payout_value}
            </li>
            <li>
              <b>URL: </b>
              <a href={postUrl} target="_blank" rel="noopener noreferrer">
                {this.props.post.url}
              </a>
            </li>
          </ul>
          <div>{reactElement}</div>
          <div className="text-right">
            <Button onClick={this.comment}>Comment</Button>
          </div>
        </div>
      );
    }
  }

  render() {
    return <div>{this.renderPost()}</div>;
  }
}

export default PostDetail;
