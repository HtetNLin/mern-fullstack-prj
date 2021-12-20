import Grid from '@material-ui/core/Grid'
import Form from '../Form/Form';

const Create = ({currentId,setCurrentId}) => {

    return ( 
        <Grid 
        container
        justifyContent = "space-between"
        alignItems = "stretch"
        spacing = {3}>
            <Grid item xs={12} sm={12}>
              <Form currentId={currentId} setCurrentId={setCurrentId} />
            </Grid>

        </Grid>
     );
}
 
export default Create;