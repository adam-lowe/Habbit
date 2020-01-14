import React from "react";
import { Line } from 'rc-progress';
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Habbit from "../Assets/TheHabbit.png"
const useStyles = makeStyles(theme => ({
    button: {
        margin: 10
    },
    card: {
        minWidth: 275,
        margin: 20
    },
    img: {
        margin: 20,
        height: 400,
        width: 525
    },
    line: {
        margin: 15
    }
}));

export default function PetStatus(props) {
    const classes = useStyles();
    return (
        <div className='PetStatus'>
            <Card className={classes.card}>
                <CardContent>
                    <img className={classes.img} src={Habbit} alt="Your Pet" />
                    <Line className={classes.line} percent={props.health} strokeWidth="5" trailColor="#000000" strokeLinecap="round" strokeColor="#3f51b5" />
                </CardContent>
            </Card>
        </div>
    )
}

