import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import "./Post.css";
import InfiniteScroll from "react-infinite-scroll-component";
import HomePage from "../HomePage/HomePage";
import { PostContext } from "../Context/PostContext";
import { setFetchPost ,setUpdatePage,setIsLoading} from "../Context/PostAction";

const postUrl = "http://localhost:8000/api/posts/getPost";
export default function Posts() {
  const {PostState, PostDispatch}  = useContext(PostContext);
  console.log("PostState",PostState)
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLOading] = useState(true);
  const [postData, setPostData] = useState("");
  const [editPostInfo, setEditPostInfo] = useState({ isEdit: false, post: "" });
  const [editPostText, setEditPostText] = useState('');
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(-1)

  useEffect(() => {
    fetchPosts();
  }, [PostState.page]);

  // useEffect(()=>{

  // })

  const deletePostApi = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:8000/api/posts/deletePost/${id}`
      );
      // setIsLOading(false);
      PostDispatch(setIsLoading(false))
      console.log(response);
    } catch (error) {
      console.log("error ocurred while deleting post", error);
      PostDispatch(setIsLoading(false))
    } finally {
      fetchPosts();
    }
  };

  const fetchPosts = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/api/posts/getPost?page=${page}`);
     // console.log("response", response);
      if (response) {
        setTotalCount(response.data.totalCount)
        const postData = page>1?[...posts, ...response.data.data]:[...response.data.data]
       // console.log("postData",postData)
        const currentPost = response.data.data;
        // setPosts((prevPosts)=>[ ...currentPost, ...prevPosts])
         setPosts(postData);
         PostDispatch(setFetchPost({posts:postData , totalCount:response.data.totalCount}))
        //  PostDispatch(setFetchPost(postData))
        // setIsLOading(false);
        PostDispatch(setIsLoading(false))
      }
    } catch (error) {
      console.log("error ocurred while fetching posts", error);
      // setIsLOading(false);
      PostDispatch(setIsLoading(false))
    }
  };

  const handleDeletePost = (id) => {
   // console.log("postId", id);
    // const filterPosts = posts.filter((post,index)=> post._id !=id)
    // setPosts(filterPosts)
    deletePostApi(id);
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const payload = {
        content: postData,
      };

      const response = await axios.post(
        "http://localhost:8000/api/posts/createPost",
        payload
      );
     // console.log("response data", response);
      setPostData("");
    } catch (error) {
      console.log("error occured while creating post", error);
    } finally {
      fetchPosts();
    }
  };

  const handleEdit = (post) => {
    setEditPostText(post.content)
    //prev state value
    setEditPostInfo((prevState) => ({
      ...prevState,
      isEdit: !prevState.isEdit,
      post: post,
    }));
    console.log(post, "edit post");
  };
  ///http://localhost:8000/api/posts/deletePost/:id

  const handleSave = async(id) => {
 try{
    console.log("saveing  updated post");
    const payload = {
        content:editPostText
    }
    const updatedPostResponse =await  axios.put(`http://localhost:8000/api/posts/editPost/${id}`,payload)
    console.log("updatedPostResponse",updatedPostResponse)
    setEditPostInfo((prevState)=>({...prevState, isEdit:false}))
 }catch(error){
    console.log("error in editing post", error)
 }finally{
    fetchPosts()
 }
  };
  // console.log("totalCount", totalCount);
  // console.log("posts length",posts.length,posts)
  const fetchMoreData = ()=>{
    setPage(page +1)
    PostDispatch(setUpdatePage(PostState.page + 1))
  }
  return (
    <>
      <div className='post-container'>
        <div>
          <form onSubmit={handleSubmit}>
            <textarea
              rows='10'
              value={postData}
              onChange={(e) => setPostData(e.target.value)}></textarea>
            <button type='submit'>Submit</button>
          </form>
        </div>
        <div className='post-info'> Showing Posts</div>
        {PostState.isLoading ? (
          <div>Loading Posts......</div>
        ) : (
          <div id="scrollableDiv" style={{ height: 300, overflow: "auto" }}>
          <InfiniteScroll
            dataLength={posts.length}    // total post count in db
            next={fetchMoreData}
            hasMore={posts.length<totalCount?true:false}
            loader={""}
            // {<h4>Loading...</h4>}
            scrollableTarget="scrollableDiv"
          >
               {PostState.posts.length>0 &&
          PostState.posts.map((post, index) => (
            <div key={post._id} className='post-body'>
              {/* <p>Image: {post.imageUrl}</p> */}
              {editPostInfo.isEdit && editPostInfo.post._id == post._id? (
                <>
                  <input  value = {editPostText} onChange={(e)=>{setEditPostText(e.target.value)}}/>
                  <button
                    onClick={() => {
                      handleSave(post._id);
                    }}>
                    Save Post
                  </button>
                </>
              ) : (
                <>
                  <h1>Title: {post.content}</h1>

                  <button
                    onClick={() => {
                      handleEdit(post);
                    }}>
                    EditPost
                  </button>
                </>
              )}

              <button
                onClick={() => {
                  handleDeletePost(post._id);
                }}>
                Delete
              </button>
            </div>
          ))}
          </InfiniteScroll>
        </div>
      
        )}
      </div>
      <HomePage myPosts={PostState.posts}/>
    </>
  );
}
