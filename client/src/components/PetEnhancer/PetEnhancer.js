import React from 'react';
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import { Alert } from '@material-ui/lab';
import TextField from "@material-ui/core/TextField";

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
    const [state, setState] = React.useState({
        points: 0,
        feedPoints: 0,
        playPoints: 0
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
                <Alert severity="info">You have {state.points} points left</Alert>
                <CardContent>
                    <form className='PetEnhancer' onSubmit={handleSubmit}>
                            <TextField
                                label='Feed'
                                id='Feed'
                                type='number'
                                name='feedPoints'
                                value={state.feedPoints}
                                variant="filled"
                                onChange={handleInputChange}
                                className={classes.textField}
                            />
                            <TextField
                                label='play'
                                id='play'
                                type='number'
                                name='playPoints'
                                value={state.playPoints}
                                variant="filled"
                                onChange={handleInputChange}
                                className={classes.textField}
                            />

                        <Button className={classes.button} type="submit" size="large" variant="outlined" color="primary">Care For Pet</Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
