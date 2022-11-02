import axios from "axios";
export const createPost = async (
  type,
  background,
  text,
  images,
  user,
) => {
  try {
    const { data } = await axios.post(
      'http://localhost:8000/createPost',
      {
        type,
        background,
        text,
        images,
        user,
      }
    );
    return "ok"
  } catch (error) {
    return error.response.data.message;
  }
};
