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
    if (this.access_token) {
      SteemConnect.setAccessToken(this.access_token);
      console.log(this.access_token);
    }
  }

  calculatePostUrl = steemitUrl => {
    return `${steemitUrl}${this.props.post.url}`;
  };

  calculateAuthorUrl = steemitUrl => {
    return `${steemitUrl}/@${this.props.post.author}`;
  };

  submitComment = () => {

  SteemConnect.comment("eaudebla", "crowthelegendvrreview-mdnmolwle9", "eaudebla", "re-crowthelegendvrreview-mdnmolwle9", "", "this is a test", "", function (err, res) {
    console.log(err, res);
});

}

  vote = () => {
    let voter = new URLSearchParams(document.location.search).get("username");
    let author = this.props.post.author;
    //let author = new URLSearchParams(document.location.search).get("username");
    let permlink = this.props.post.permlink;
    console.log(voter);
    console.log(author);
    console.log(permlink);
    console.log(10000);
    console.log(this.props.post);

    SteemConnect.vote(voter, author, permlink, 10000, function(err, res) {
      console.log(err, res);
    });
  };

  me = () => {
    SteemConnect.me(function(err, res) {
      console.log(err, res);
    });
  };

  follow = () => {
    SteemConnect.follow("eaudebla", "osakaghoul", function(err, res) {
      console.log(err, res);
    });
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
            <Button onClick={this.submitComment}>Comment</Button>
            <Button onClick={this.vote}>Vote</Button>
            <Button onClick={this.me}>Me</Button>
            <Button onClick={this.follow}>Follow</Button>
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
