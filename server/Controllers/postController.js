import {
  createNewPost,
  deletePostData,
  getAllPosts,
  updatePostData,
} from "../Services/postServices.js";
export const getPosts = async (req, res) => {
  try {
    const posts = await getAllPosts();
    res.status(200).send(posts);
  } catch (error) {
    res.status(404).send({ error: error.message });
  }
};

export const createPost = async (req, res) => {
  try {
    const posts = await createNewPost(req.body);
    res.status(200).send(posts);
  } catch (error) {
    res.status(404).send({ error: error.message });
  }
};

export const updatePost = async (req, res) => {
  try {
    console.log(req.params.id, req.body);
    const post = await updatePostData(req.params.id, req.body);
    res.status(200).send(post);
  } catch (error) {
    res.status(404).send({ error: error.message });
  }
};
export const deletePost = async (req, res) => {
  try {
    console.log(req);
    const result = await deletePostData(req.params.id);
    res.status(200).send(result);
  } catch (error) {
    res.status(404).send({ error: error.message });
  }
};
