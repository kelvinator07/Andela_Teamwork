export default class Comment {
  constructor(id, description, authorid, postid) {
    this.id = id;
    this.authorid = authorid;
    this.postid = postid;
    this.description = description;
  }
}
