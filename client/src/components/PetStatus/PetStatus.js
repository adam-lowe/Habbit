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
    return (
        <div className='PetStatus'>
            <Card className={classes.card}>
                <CardContent>
                    <img className={classes.img} src={`http://placekitten.com/200/200`} alt="Kitten" />
                    <Line className={classes.line} percent={props.health} strokeWidth="2" strokeColor="#2db7f5" />
                    <Button className={classes.button} type="submit" size="large" variant="outlined" color="primary">Pass Time</Button>
                </CardContent>
            </Card>
        </div>
    )
}

