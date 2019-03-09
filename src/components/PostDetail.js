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

    let author = this.props.post.author;
    let commenter = new URLSearchParams(document.location.search).get("username");
    let permlink = this.props.post.permlink;
    let body = '<center><p>Hi!</p>'+
               '<p>I am @eaudebla, a curator for AkibaSteem and this is just to let you know that I upvoted your post:</p>'+
               '<div class="text-justify"><blockquote>We\'re an anime-focused community full of fans and good people!'+
               'We aim to find good anime &amp; manga content, share a happy moment &amp; give some visibility. Keep up the great work!</blockquote></div>'+
               '<p><b>Also, feel free to join our community on Discord!</b></p>'+
               '<p><a href="https://discord.gg/7JQruwm"><img src="https://i.imgur.com/9z0Lrzv.png"></a></p>'+
               '<a href="https://discord.gg/7JQruwm">https://discord.gg/7JQruwm</a></center>';

    SteemConnect.comment(
      author,
      permlink,
      commenter,
      "re-"+permlink,
      "",
      body,
      "",
      function(err, res) {
        console.log(err, res);
      }
    );
  };

    vote = () => {
    let voter = new URLSearchParams(document.location.search).get("username");
    let author = this.props.post.author;
    //let author = new URLSearchParams(document.location.search).get("username");
    let permlink = this.props.post.permlink;
    SteemConnect.vote(voter, author, permlink, 10000, function(err, res) {
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
            <Button onClick={this.vote}>Vote</Button>
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
