import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import Grid from "@material-ui/core/Grid";


import EmailSharpIcon from "@material-ui/icons/EmailSharp";
import ShortTextSharpIcon from "@material-ui/icons/ShortTextSharp";
import EventNoteSharpIcon from "@material-ui/icons/EventNoteSharp";


const useStyles = makeStyles(theme => ({
  button: {
    margin: "auto",
    "box-shadow": theme.shadows[9]
  },
  card: {
    minWidth: 275,
    margin: 20,
    "box-shadow": theme.shadows[12]
  },
  form: {
    flexGrow: 1
  },
  textField: {
    width: "90%"
  },
  title: {
    fontSize: 14
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary
  }
}));

export default function TaskForm(props) {
  const classes = useStyles();
  const [state, setState] = React.useState({
    title: "",
    dueDate: "",
    description: ""
  });
  const handleInputChange = event => {
    const { name, value } = event.target;
    setState({
      ...state,
      [name]: value
    });
  };

  const handleSubmit = event => {
    event.preventDefault();
    const { title, dueDate, description } = state;
    props.onSubmit(title, dueDate, description);
  };
  return (
    <div className="TaskCard">
      <Card className={classes.card} variant="outlined">
        <form
          className={classes.form}
          autoComplete="off"
          noValidate
          onSubmit={handleSubmit}
        >
          <CardContent>
            <Typography
              className="TaskTitle"
              color="textSecondary"
              variant="h3"
              gutterBottom
            >
              Create a New Task:
            </Typography>
            <Grid container direction="column" spacing={3}>
              <Grid item xs={12}>
                <TextField
                  id="task-title-input"
                  name="title"
                  type="text"
                  value={state.title}
                  label="Task Title"
                  variant="filled"
                  onChange={handleInputChange}
                  className={classes.textField}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <ShortTextSharpIcon />
                      </InputAdornment>
                    )
                  }}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  id="due-date-input"
                  name="dueDate"
                  type="datetime-local"
                  value={state.dueDate}
                  label="Task must be completed by:"
                  variant="filled"
                  onChange={handleInputChange}
                  className={classes.textField}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <EventNoteSharpIcon />
                      </InputAdornment>
                    )
                  }}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  id="task-description-input"
                  name="description"
                  type="text"
                  value={state.description}
                  label="Description"
                  variant="filled"
                  onChange={handleInputChange}
                  className={classes.textField}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <EmailSharpIcon />
                      </InputAdornment>
                    )
                  }}
                />
              </Grid>
            </Grid>
          </CardContent>
          <CardActions>
            <Button
              className={classes.button}
              type="submit"
              size="large"
              variant="outlined"
              color="primary"
            >
              Create Task
            </Button>
          </CardActions>
        </form>
      </Card>
    </div>
  );
}
