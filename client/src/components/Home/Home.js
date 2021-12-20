import { Container,Grow, Grid } from "@material-ui/core";
import Posts from "../Posts/Posts";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getPosts } from "../../actions/posts";

const Home = ({currentId,setCurrentId}) => {

      const dispatch = useDispatch();
      // const [currentId, setCurrentId] = useState(null);

      useEffect(() => {
        dispatch(getPosts());
      }, [currentId, dispatch]);

    return ( 
        <Grow in>
        <Container>
          <Grid
            container
            justifyContent = "space-between"
            alignItems = "stretch"
            spacing = {3}
          >
            <Grid item xs={12} sm={12}>
              <Posts setCurrentId={setCurrentId} />
            </Grid>
            {/* <Grid item xs={12} sm={4}>
              <Form currentId={currentId} setCurrentId={setCurrentId} />
            </Grid> */}
          </Grid>
        </Container>
      </Grow>
     );
}
 
export default Home;