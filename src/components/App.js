import React, { Component } from "react";
import SteemClient from "../apis/SteemClient";
import SteemConnect from "../apis/SteemConnect";
import SearchBar from "./SearchBar";
import PostList from "./PostList";
import PostDetail from "./PostDetail";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { posts: [], selectedPost: null };
    this.link = SteemConnect.getLoginURL();
  }
  componentDidMount() {
    this.onTermSubmit("anime");
  }

  onTermSubmit = async term => {
    var query = {
      tag: term,
      limit: 20
    };

    SteemClient.database.getDiscussions("created", query).then(posts => {
      this.setState({ posts });
    });
  };

  onPostSelect = post => {
    this.setState({ selectedPost: post });
  };


  render() {

    return (
      <Container fluid={false} className="my-5">
        <Button href={this.link}>Login</Button>
        <Row>
          <Col xs={6} md={6}>
            <SearchBar onFormSubmit={this.onTermSubmit} />
            <PostList
              onPostSelect={this.onPostSelect}
              posts={this.state.posts}
            />
          </Col>
          <Col xs={6} md={6}>
            <PostDetail post={this.state.selectedPost} />
          </Col>
        </Row>
      </Container>
    );
  }
}

export default App;
