import React from "react";
import "../css/App.css";
import Media from "react-bootstrap/Media";

const PostItem = ({ post, onPostSelect }) => {
  var steemitUrl = "https://steemit.com";
  var postUrl = `${steemitUrl}${post.url}`;
  var authorUrl = `${steemitUrl}/@${post.author}`;

  const json = JSON.parse(post.json_metadata);

  return (
    <div onClick={() => onPostSelect(post)}>
      <Media as="li" className="list-group-item">
        <img
          width={150}
          className="mr-3 img-thumbnail"
          src={json.image ? json.image[0] : ""}
          alt={json.image ? json.image[0] : ""}
        />
        <Media.Body>
          <h5>{post.title}</h5>
          <ul className="post-list">
            <li>
              <b>Author:</b> <a href={authorUrl}>{post.author}</a>
            </li>
            <li>
              <b>Time:</b> {post.created}
            </li>
            <li>
              <b>Payout value:</b> {post.pending_payout_value}
            </li>
            <li>
              <b>URL:</b>
              <a href={postUrl} target="_blank" rel="noopener noreferrer">
                {post.url}
              </a>
            </li>
          </ul>
        </Media.Body>
      </Media>
    </div>
  );
};

export default PostItem;
