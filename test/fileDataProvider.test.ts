import { expect } from "chai";
import { Config, ConfigData } from "../src/config";
import { FileDataProvider } from "../src/data/fileDataProvider";
import winston = require('winston');
import "mocha";

describe("fileDataProvider", () => {
  let config: Config = new Config();

  beforeEach(() => {
    config.data = new ConfigData();
    config.data.type = "file";
    config.data.postPath = __dirname + "/blog";
    config.data.contentPath = __dirname + "/blog/content";
    config.data.templatePath = __dirname + "/blog/templates";
  });

  it("config gets setup in init", () => {
    let fileProvider = new FileDataProvider();
    fileProvider.init(config);

    expect(fileProvider.__postPath).to.equal(config.data.postPath);
  });

  it("config gets no config.data.postPath in init", () => {
    let fileProvider = new FileDataProvider();

    config.data.postPath = "";

    fileProvider.init(config);

    expect(fileProvider.__postPath).to.equal(config.data.postPath);
  });

  it("should get the posts from the file system", async () => {
    let fileProvider = new FileDataProvider();
    fileProvider.init(config);

    let posts = await fileProvider.getPosts();

    expect(posts.length).to.equal(5);
  });

  it("should get the posts from memory", async () => {
    let fileProvider = new FileDataProvider();
    fileProvider.init(config);

    await fileProvider.getPosts();

    let posts = await fileProvider.getPosts();

    expect(posts.length).to.equal(5);
  });

  it("should get a valid post", async () => {
    let fileProvider = new FileDataProvider();
    fileProvider.init(config);

    let post = await fileProvider.getPost("article-simple");

    expect(post.title).to.equal("Article Simple");
  });

  it("should not get a valid post", async () => {
    let fileProvider = new FileDataProvider();
    fileProvider.init(config);

    let post = await fileProvider.getPost("article");

    expect(post).to.equal(undefined);
  });

  it("should get a post", async () => {
    let fileProvider = new FileDataProvider();
    fileProvider.init(config);

    let post = await fileProvider.getPost("all-about-the-tesla-model-3");

    expect(post.title).to.equal("Tesla Model 3");
  });

  it("should published posts", async () => {
    let fileProvider = new FileDataProvider();
    fileProvider.init(config);

    let posts = await fileProvider.getPosts();

    expect(posts.length).to.equal(5);
  });

  it("should have a valid tag", async () => {
    let fileProvider = new FileDataProvider();
    fileProvider.init(config);

    let tag = await fileProvider.getTag("whale");

    expect(tag.name).to.equal("whale");
  });

  it("should have a valid tag and multiple posts", async () => {
    let fileProvider = new FileDataProvider();
    fileProvider.init(config);

    let tag = await fileProvider.getTag("whale");

    expect(tag.posts.length).to.equal(2);
  });

  it("should have a invalid tag", async () => {
    let fileProvider = new FileDataProvider();
    fileProvider.init(config);

    let tag = await fileProvider.getTag("snoopy");

    expect(tag).to.equal(undefined);
  });

  it("should generate the correct amount of tags", async () => {
    let fileProvider = new FileDataProvider();
    fileProvider.init(config);

    let posts = await fileProvider.getPosts();

    let tags = await fileProvider.generateTags(posts);

    expect(tags.length).to.equal(12);
  });

  it("parse bad file path post", async () => {
    let fileProvider = new FileDataProvider();
    //set the logging level
    fileProvider.__log = new winston.Logger({ transports: undefined });

    let post = await fileProvider.parsePost("../foo.md")

    expect(post).to.equal(undefined);
  });
});
