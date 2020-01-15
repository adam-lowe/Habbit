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
        margin: 20,
        padding: 10,
        "box-shadow": theme.shadows[15]
    },
    img: {
        width: "100%",
        maxWidth: 400,
        maxHeight:400,
        "margin-top": 25
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
<<<<<<< HEAD
                    <img className={classes.img} src={Habbit} alt="Your Pet" />
                    <p> {props.health}/100 </p>
                    <Line className={classes.line} percent={props.health} strokeWidth="5" trailColor="#000000" strokeLinecap="round" strokeColor="#3f51b5" />
=======
                    <img className={classes.img} src={Habbit} alt="pet image" />
                    <Line className={classes.line} percent={props.health} strokeWidth="3" trailColor="#000000" strokeLinecap="round" strokeColor="#008000" />
>>>>>>> some styling done, still working on petStatus sizing issue
                </CardContent>
            </Card>
        </div>
    )
}

