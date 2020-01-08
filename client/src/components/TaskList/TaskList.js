import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";

import AuthContext from "../../contexts/AuthContext";

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
  const authContext = React.useContext(AuthContext);
  const { user } = authContext;
  const [tasks,] = React.useState(user.todos);

  const handleClick = taskId => {
    const currentTask = user.todos.find(task => task._id === taskId);
    currentTask.complete = !currentTask.complete;
    user.points += 5;
    authContext.updateUser(user);
  };

  const renderTasks = tasks.map(function(task) {
    return !task.complete && (
      <Card className={classes.card} key={task._id}>
        <CardContent>
          <h2>{task.title}</h2>
          <p>{task.description}</p>
          <h3>Date: {task.dueDate}</h3>
          <h4>
            Priority:
            {task.priority}
          </h4>
          <h5>Completed: {task.complete ? "Yes" : "No"}</h5>
          {!task.complete && (
            <Button
              onClick={() => handleClick(task._id)}
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
    );
  });

  return <div className="TaskList">{renderTasks}</div>;
}
