import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";

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

export default function TaskList(props) {
    const classes = useStyles();

    const tasks = [{name:'Garden', date:'01/23/20', priority:3, desc:'do the garden'}, {name:'Help', date:'01/29/20', priority:4, desc:'get broom'},{name:'Dshib', date:'01/84/12', priority:5, desc:'chk'}]
    
    const renderTasks = tasks.map(function (task) {
        return(
        <Card className={classes.card}>
            <CardContent>
            {task.name}: {task.desc} | Date: {task.date} | Priority: {task.priority}

            </CardContent>
        </Card>
    )})

    return (
        <div className='TaskList'>
            {renderTasks}
        </div>
    )
}

