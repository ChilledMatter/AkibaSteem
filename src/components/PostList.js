import React from "react";
import PostItem from "./PostItem";

const PostList = ({ posts, onPostSelect }) => {
  const renderedList = posts.map(post => {
    return (
      <PostItem key={post.post_id} onPostSelect={onPostSelect} post={post} />
    );
  });

  return <ul className="list-group">{renderedList}</ul>;
};

export default PostList;
