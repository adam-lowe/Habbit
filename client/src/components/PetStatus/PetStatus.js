import React from "react";
import { Line } from 'rc-progress';
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles(theme => ({
    button: {
        margin: 10
    },
    card: {
        minWidth: 275,
        margin: 20
    },
    img: {
        margin: 20
    },
    line: {
        margin: 15
    }
}));

export default function PetStatus(props) {
    const classes = useStyles();
    const [state, setState] = React.useState({
        health: 100
    });
    const loseHealth = () => {
        const pHealth = state.health - 10
        setState({
            health: pHealth
        });
    }
    return (
        <div className='PetStatus'>
            <Card className={classes.card}>
                <CardContent>
                    <img className={classes.img} src="http://placekitten.com/400/300" alt="Kitten" />
                    <Line className={classes.line} percent={state.health} strokeWidth="2" strokeColor="#2db7f5" />
                    <Button className={classes.button} type="submit" size="large" onClick={loseHealth} variant="outlined" color="primary">Pass Time</Button>
                </CardContent>
            </Card>
        </div>
    )
}

