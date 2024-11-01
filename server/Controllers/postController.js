import PostServices from "../Services/postServices.js";

export const getPosts = async (req, res) => {
  try {
    const posts = await PostServices.getAllPosts(req.query);
    res.status(200).send(posts);
  } catch (error) {
    res.status(404).send({ error: error.message });
  }
};

export const createPost = async (req, res) => {
  try {
    const posts = await PostServices.createPost(req.body);
    res.status(200).send(posts);
  } catch (error) {
    res.status(404).send({ error: error.message });
  }
};

export const updatePost = async (req, res) => {
  try {
    const user = { userId: req.body.userId, userName: req.body.userName };
    const post = await PostServices.updatePost(req.params.id, req.body, user);
    res.status(200).send(post);
  } catch (error) {
    res.status(404).send({ error: error.message });
  }
};
export const deletePost = async (req, res) => {
  try {
    const user = { userId: req.body.userId, userName: req.body.userName };
    const result = await PostServices.deletePost(req.params.id, user);
    res.status(200).send(result);
  } catch (error) {
    res.status(404).send({ error: error.message });
  }
};

export const likePost = async (req, res) => {
  try {
    const user = { userId: req.body.userId, userName: req.body.userName };
    const post = await PostServices.likePost(req.params.id, user);
    res.status(200).send(post);
  } catch (error) {
    res.status(404).send({ error: error.message });
  }
};

export const getPostById = async (req, res) => {
  try {
    const post = await PostServices.getPostById(req.params.id);
    res.status(200).send(post);
  } catch (error) {
    res.status(404).send({ error: error.message });
  }
};
export const updateComment = async (req, res) => {
  try {
    const user = { userId: req.body.userId, userName: req.body.userName };
    const post = await PostServices.updateComment(
      req.params.id,
      req.body,
      user
    );
    res.status(200).send(post);
  } catch (error) {
    res.status(404).send({ error: error.message });
  }
};
