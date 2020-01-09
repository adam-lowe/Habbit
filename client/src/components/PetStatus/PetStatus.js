import React from "react";
import { Line } from 'rc-progress';
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
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
                    <img className={classes.img} src={Habbit} alt="Kitten" />
                    <Line className={classes.line} percent={props.health} strokeWidth="5" trailColor="#000000" strokeLinecap="square" strokeColor="#008000" />
                </CardContent>
            </Card>
        </div>
    )
}

