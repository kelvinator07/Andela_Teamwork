export default class Comment {
  constructor(id, description, authorid, articleid) {
    this.id = id;
    this.authorid = authorid;
    this.articleid = articleid;
    this.description = description;
  }
}
