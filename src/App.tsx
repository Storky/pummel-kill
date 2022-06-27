import React, {FC} from 'react';
import './App.css';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import SearchAppBar from 'components/AppBar';

import getNumbersTo1Dmg from 'engine/pummel'
import {userSlice} from 'store/reducers/UserSlice';
import {useAppDispatch, useAppSelector} from 'utils/hooks/redux';
import {fetchUsers} from 'store/reducers/ActionCreators';
import {postAPI} from 'services/PostService';
import {IPost} from 'models/IPost';

interface PostItemProps {
    post: IPost;
    remove: (post: IPost) => void;
    update: (post: IPost) => void;
}

const PostItem: FC<PostItemProps> = ({post, remove, update}) => {
    return (
        <div>
            <button style={{margin: '10px'}} onClick={() => remove(post)}>Delete</button>
            <button style={{margin: '10px'}} onClick={() => {
                const title  = prompt() || '';
                console.clear()
                console.log(1111, {...post, title});
                update({...post, title});
            }}>Update</button>
            {post.id}. {post.title}
        </div>
    )
}




function App() {
    const {count, users, } = useAppSelector(state => state.userReducer)
    // const {count, users, isLoading, error} = useAppSelector(state => state.userReducer)
    const {increment} = userSlice.actions;
    const dispatch  = useAppDispatch();

    const {data: posts, isLoading, error, refetch} = postAPI.useFetchAllPostsQuery(100);
    const [createPost, {}] = postAPI.useCreatePostMutation();
    const [updatePost, {}] = postAPI.useUpdatePostMutation();
    const [deletePost, {}] = postAPI.useDeletePostMutation();

    React.useEffect(()=>{
        dispatch(fetchUsers());
    }, []);

    React.useEffect(()=>{
        getNumbersTo1Dmg();
    });

    // console.log(JSON.stringify(users, null, 2));

    const handleCreate = async () => {

        const title = prompt();
        await createPost({title, body: title} as IPost)


    };


    return (
        <React.Fragment>
            <CssBaseline />

            <SearchAppBar/>
            <Container maxWidth="lg" sx={{marginY: 5}}>
                {/*https://www.youtube.com/watch?v=o1chMISeTC0*/}

                {/*https://youtu.be/Od5H_CiU2vM?t=685*/}
                {/*https://github.com/utimur/redux_toolkit_rtk_query*/}

                <h1><button onClick={() => dispatch(increment(5))}>current count = {count}</button></h1>

                {isLoading && <h1>Loading... 111 {isLoading}</h1>}
                {error && <h1>Error</h1>}

                <h1>POSTS
                    <button onClick={() => refetch()}>refetch</button>
                    <button onClick={handleCreate}>Add new post</button>
                </h1>

                <ul>
                    <h4>{posts && posts.map((post) =>
                        <PostItem
                            key={post.id}
                            post={post}
                            remove={(post) => deletePost(post)}
                            update={(post) => updatePost(post)}
                        />
                        )}</h4>

                </ul>


            </Container>
        </React.Fragment>
  );
}

export default App;
