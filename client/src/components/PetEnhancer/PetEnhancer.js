import React from 'react';
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";

import AuthContext from '../../contexts/AuthContext';

const useStyles = makeStyles(theme => ({
    button: {
        margin: 10
    },
    card: {
        minWidth: 275,
        margin: 20
    },
    form: {
      flexGrow: 1
    },
    textField: {
      width: "90%",
      margin: 15
    }
}));

export default function PetEnhancer(props) {
    const classes = useStyles();
    const authContext = React.useContext(AuthContext);
    const [state, setState] = React.useState({
        points: authContext.user.points
    });
    const handleInputChange = event => {
        const { name, value } = event.target;
        setState({
            ...state,
            [name]: value
        });
    };

    const handleSubmit = event => {
        const { feedPoints, playPoints } = state;
        props.onSubmit(feedPoints, playPoints);
        event.preventDefault();
    };

    return (
        <div className='PetEnhancer'>
            <Card className={classes.card}>
            {/* {state.error && (
          <Grid item xs={12}>
            <ErrorMsg className={classes.margin} message={state.error} />
          </Grid>
        )} */}
            <Typography
              className="PointsTotal"
              color="textSecondary"
              gutterBottom
            >
              You have {state.points} points left
            </Typography>
                <CardContent>
                    <form className='PetEnhancer' onSubmit={handleSubmit}>
                            <TextField
                                label='Feed'
                                id='Feed'
                                type='number'
                                name='points'
                                value={state.points}
                                variant="filled"
                                onChange={handleInputChange}
                                className={classes.textField}
                            />
                            {/* <TextField
                                label='play'
                                id='play'
                                type='number'
                                name='playPoints'
                                value={state.playPoints}
                                variant="filled"
                                onChange={handleInputChange}
                                className={classes.textField}
                            /> */}

                        <Button className={classes.button} type="submit" size="large" variant="outlined" color="primary">Care For Pet</Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
