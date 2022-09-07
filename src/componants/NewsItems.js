import * as React from "react";
import { Component } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea, Container } from "@mui/material";
import Button from "@mui/material/Button";
import not_available_image from "../images/no-image-available-icon.jpg";
import "./newsitems.css";
import LoadingBar from "./LoadingBar";
import { CardHeader } from '@mui/material';


export default class NewsItems extends Component {
  handlePrevPage = async () => {
    this.setState({ loading: true });
    let url = `https://newsapi.org/v2/top-headlines?country=${
      this.props.country
    }&category=${
      this.state.category
    }&apiKey=eb76a3e7bf634436a1c911f0bc36bb57&page=${this.state.page - 1}`;
    let data = await fetch(url);
    let parseData = await data.json();

    this.setState({
      articles: parseData.articles,
      page: this.state.page - 1,
      loading: false,
    });
  };

  handleNextPage = async () => {
    this.setState({
      loading: true,
    });
    let url = `https://newsapi.org/v2/top-headlines?country=${
      this.props.country
    }&category=${
      this.state.category
    }&apiKey=eb76a3e7bf634436a1c911f0bc36bb57&page=${this.state.page + 1}`;

    let data = await fetch(url);
    let parseData = await data.json();
    this.setState({
      articles: parseData.articles,
      page: this.state.page + 1,
      loading: false,
    });
    console.log(this.state.page + 1);
  };

  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      page: 1,
      totalResults: 0,
      loading: true,
      category: this.props.category,
    };
  }

  async componentDidMount() {
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.state.category}&apiKey=eb76a3e7bf634436a1c911f0bc36bb57`;
    let data = await fetch(url);
    let parseData = await data.json();

    this.setState({
      articles: parseData.articles,
      page: 1,
      totalResults: parseData.totalResults,
      loading: false,
    });
  }

  render() {
    console.log(this.state.articles)
    return (
      <>
        <Box
          sx={{
            flexGrow: 1,
          }}
        >
          <Container>
            <Grid
              container
              spacing={{ xs: 2, md: 3 }}
              columns={{ xs: 4, sm: 8, md: 12 }}
              style={{
                margin: "0",
              }}
            >
              {this.state.loading ? (
                <LoadingBar />
              ) : (
                this.state.articles.map((articles, index) => (
                  <Grid xs={12} sm={4} md={4} key={index}>
                    <Card style={{ height: "100%", position: "relative" }}>
                      <CardHeader
                        // title={`By ${articles.author}`}
                        // `${new Date(articles.publishedAt).getHours() === new Date().getHours()}` ? `${new Date().getMinutes(articles.publishedAt)} minutes`
                        title={`By ${articles.source['name']}`}
                        subheader={`${new Date(articles.publishedAt).toDateString() === new Date().toDateString()}` ? `${new Date(articles.publishedAt).getHours() === new Date().getHours()}` ? `${new Date(articles.publishedAt).getMinutes()} minutes ago` : `Published ${new Date(articles.publishedAt).getHours()} hours ago` : `Published ${new Date(articles.publishedAt).toDateString()}`}
                      />
                    
                      <CardActionArea>
                        <CardMedia
                          component="img"
                          height="200"
                          image={
                            articles.urlToImage === null
                              ? not_available_image
                              : articles.urlToImage
                          }
                          alt={articles.title}
                          loading="lazy"
                        />
                        <CardContent>
                          <Typography gutterBottom variant="h5" component="div">
                            {articles.title.length === null
                              ? "there is no title available now"
                              : articles.title.length > 40
                              ? articles.title.substr(0, 40).trim() + ".."
                              : articles.title}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {articles.description === null
                              ? "there is no description available now"
                              : articles.description.length > 200
                              ? articles.description.substr(0, 200).trim() +
                                ".."
                              : articles.description}
                          </Typography>
                        </CardContent>
                      </CardActionArea>
                    </Card>
                  </Grid>
                ))
              )}
            </Grid>
          </Container>
        </Box>

        <Container
          sx={{
            display: "flex",
            justifyContent: "space-between",
            p: 1,
            margin: "auto",
          }}
        >
          <Button
            disabled={this.state.page === 1}
            variant="contained"
            style={{ backgroundColor: "#3f51b5" }}
            onClick={this.handlePrevPage}
          >
            Prev Page
          </Button>
          <Button
            disabled={
              this.state.page + 1 > Math.ceil(this.state.totalResults / 20)
            }
            variant="contained"
            style={{ backgroundColor: "#3f51b5" }}
            onClick={this.handleNextPage}
          >
            Next Page
          </Button>
        </Container>
      </>
    );
  }
}
