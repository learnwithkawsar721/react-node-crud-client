import "./App.css";
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  TextField,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [title, setTitle] = useState("");
  const [discription, setDiscription] = useState("");
  const [error, setError] = useState({});
  const [todos, setTodos] = useState([]);
  const [edit, setEdit] = useState({});

  // handelOnSubmit
  const handelOnSubmit = (e) => {
    e.preventDefault();
    if (!title) {
      return setError({ title: "title is required" });
    }
    if (!discription) {
      return setError({ discription: "discription is required" });
    }
    const data = { title, discription };
    axios
      .post(`https://todo-croud.herokuapp.com/todo/add`, data)
      .then((result) => {
        setTodos([...todos, result.data.data]);
        e.target.reset();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  // GET DATA
  useEffect(() => {
    axios
      .get(`https://todo-croud.herokuapp.com/todo/`)
      .then((result) => setTodos(result.data.data));
  }, []);
  // DELETE TODO
  const deleteTodo = (id) => {
    axios.delete(`https://todo-croud.herokuapp.com/todo/${id}`).then((res) => {
      const newData = todos.filter((todo) => todo._id !== id);
      setTodos(newData);
    });
  };
  // EDIT TODOS
  const handelEdit = (e) => {
    e.preventDefault();
    const id = edit._id;

    const data = {
      title: title || edit?.title,
      discription: discription || edit?.discription,
    };
    axios
      .put(`https://todo-croud.herokuapp.com/todo/${id}`, data)
      .then((res) => {
        axios
      .get(`https://todo-croud.herokuapp.com/todo/`)
      .then((res) => setTodos(res.data.data));
      }
      );
    setEdit(" ");
  };
  // hendelEdit
  const hendelEdit = (id) => {
    axios
      .get(`https://todo-croud.herokuapp.com/todo/${id}`)
      .then((res) => setEdit(res.data.data));
  };
  return (
    <Box sx={{ pt: 3 }} className="App">
      {edit._id && (
        <Card sx={{ width: "50%", margin: "auto", background: "#fff" }}>
          <CardContent>
            <Typography
              sx={{ fontSize: 34 }}
              variant="body1"
              color="text.secondary"
              gutterBottom
            >
              Edit Todo
            </Typography>
            <form method="post" onSubmit={handelEdit}>
              <TextField
                id="outlined-password-input"
                label="Title"
                autoComplete="current-password"
                sx={{ width: "100%" }}
                value={edit?.title || ""}
                onChange={(e) => {
                  setTitle(e.target.value);
                  setEdit({ ...edit, title: e.target.value });
                  setError("");
                }}
              />
              <Typography sx={{ color: "#b71c1c" }}>{error.title}</Typography>
              <TextField
                id="filled-textarea"
                label="Multiline"
                multiline
                maxRows={4}
                variant="filled"
                value={edit?.discription || ""}
                sx={{ width: "100%", my: 3, border: 0 }}
                onChange={(e) => {
                  setDiscription(e.target.value);
                  setEdit({ ...edit, discription: e.target.value });
                  setError("");
                }}
              />
              <Typography sx={{ color: "#b71c1c", marginBottom: "20px" }}>
                {error.discription}
              </Typography>
              <Button type="submit" variant="contained">
                Edit Todo
              </Button>
            </form>
          </CardContent>
        </Card>
      )}
      {!edit._id && (
        <Card sx={{ width: "50%", margin: "auto", background: "#fff" }}>
          <CardContent>
            <Typography
              sx={{ fontSize: 34 }}
              variant="body1"
              color="text.secondary"
              gutterBottom
            >
              Add Todo
            </Typography>
            <form method="post" onSubmit={handelOnSubmit}>
              <TextField
                id="outlined-password-input"
                label="Title"
                type="text"
                autoComplete="current-password"
                sx={{ width: "100%" }}
                onChange={(e) => {
                  setTitle(e.target.value);
                  setError("");
                }}
              />
              <Typography sx={{ color: "#b71c1c" }}>{error.title}</Typography>
              <TextField
                id="filled-textarea"
                label="Multiline"
                multiline
                maxRows={4}
                variant="filled"
                sx={{ width: "100%", my: 3, border: 0 }}
                onChange={(e) => {
                  setDiscription(e.target.value);
                  setError("");
                }}
              />
              <Typography sx={{ color: "#b71c1c", marginBottom: "20px" }}>
                {error.discription}
              </Typography>
              <Button type="submit" variant="contained">
                Add Todo
              </Button>
            </form>
          </CardContent>
        </Card>
      )}

      <Container>
        <Table sx={{ minWidth: 950 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell align="center">Title</TableCell>
              <TableCell align="center">Dis</TableCell>
              <TableCell align="center">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {todos.map((todo, index) => (
              <TableRow
                align="center"
                key={index}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {index + 1}
                </TableCell>
                <TableCell component="th" scope="row">
                  {todo.title}
                </TableCell>
                <TableCell component="th" scope="row">
                  {todo.discription}
                </TableCell>
                <TableCell component="th" scope="row">
                  <Button
                    variant="contained"
                    className="custom_btn"
                    sx={{
                      backgroundColor: "red",
                      marginRight: "10px",
                    }}
                    onClick={() => deleteTodo(todo._id)}
                  >
                    Delete
                  </Button>
                  <Button
                    variant="contained"
                    onClick={() => hendelEdit(todo._id)}
                  >
                    Edit
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Container>
    </Box>
  );
}

export default App;
