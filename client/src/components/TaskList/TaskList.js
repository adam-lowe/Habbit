import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";

import Moment from "moment";

const useStyles = makeStyles(theme => ({
  button: {
    margin: 10,
    color: theme.palette.text.secondary,
    "box-shadow": theme.shadows[9]
  },
  card: {
    minWidth: 275,
    margin: 20,
    "box-shadow": theme.shadows[12]
  },
  line: {
    margin: 15
  }
}));

export default function TaskList(props) {
  const classes = useStyles();
  const [tasks, setTasks] = useState([]);
  useEffect(() => {
    if (props.tasks) setTasks(props.tasks.filter(task => !task.complete));
  }, [props]);
  const renderTasks = tasks.map(function(task, index) {
    return (
      task &&
      task._id && (
        <Card className={classes.card} key={task.id} variant="outlined">
          <CardContent>
            <h2>{task.title}</h2>
            <p>{task.description}</p>

            <h3>
              Due Date:{" "}
              {Moment(task.dueDate).format("dddd, MMMM Do YYYY, h:mm A")}
            </h3>
            {/* <h4>
              Priority:
              {task.priority}
            </h4> */}
            <h5>Completed: {task.complete ? "Yes" : "No"}</h5>
            {!task.complete && (
              <Button
                onClick={event => props.taskClick(event, task._id)}
                className={classes.button}
                type="button"
                size="large"
                variant="outlined"
                color="primary"
              >
                Complete Task
              </Button>
            )}
          </CardContent>
        </Card>
      )
    );
  });
  return tasks.length ? (
    <div className="TaskList">{renderTasks}</div>
  ) : (
    <div>
      <h2 className="completeTitle">All Tasks Completed!</h2>
      <p className="completeMsg">Your pet will get hungry!</p>
      <Link className="completeLink" to="/task">Create more tasks to complete</Link>
    </div>
  );
}
