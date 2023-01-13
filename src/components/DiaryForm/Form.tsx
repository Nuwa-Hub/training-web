import * as React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { Button, Collapse } from "@mui/material";
import Textarea from "@mui/joy/Textarea";
import { useDispatch, useSelector } from "react-redux/es/exports";
import { addMsgStart } from "../../pages/DiaryHome/DiaryHomeSlice";
import { msgState, userState } from "../../helpers/Interfaces";

export default function Form(_props: {
  fullText: boolean;
  setFullText: (message: boolean) => void;
}) {
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [focusedTitle, setFocusedTitle] = React.useState(false);
  const [focusedDescription, setFocusedDescription] = React.useState(false);

  const distpatch = useDispatch();

  const user = useSelector((state: userState) => state.user);
  const isFetching = useSelector((state: msgState) => state.message.isFetching);

  const handleSubmit = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (title === "") {
      console.log("title required!!!");
    } else if (description === "") {
      console.log("description required!!!");
    } else {
      try {
        const newMsg = {
          name: user.currentUser,
          title: title,
          description: description,
        };

        distpatch(addMsgStart(newMsg));
        setDescription("");
        setTitle("");
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    }
  };

  return (
    <Collapse in={_props.fullText} collapsedSize={130}>
      <Box sx={{ margin: "20px" }}>
        <Typography
          variant="h3"
          sx={{
            color: "white",
            textAlign: "left",
            textDecorationColor: "white",
            margin: "10px",
          }}
          onClick={() => _props.setFullText(false)}
        >
          HOME
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={10}>
            <Textarea
              minRows={1}
              placeholder="Title…"
              variant="solid"
              sx={{ backgroundColor: "lightblue", borderRadius: "40px" }}
              onClick={() => _props.setFullText(true)}
              onChange={(e) => setTitle(e.target.value)}
              value={title}
              // eslint-disable-next-line no-restricted-globals
              error={focusedTitle && title === "" ? true : false}
              onBlur={(e) => setFocusedTitle(true)}
            />
          </Grid>
          <Grid
            item
            xs={12}
            sm={2}
            sx={{
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <Button
              sx={{
                width: 150,
                height: 40,
                borderRadius: "30px",
                backgroundColor: "lightblue",
                display: {
                  xs: "none",
                  md: "flex",
                  xl: "flex",
                },
               
              }}
              variant="contained"
              onClick={handleSubmit}
              // eslint-disable-next-line eqeqeq
              disabled={
                description == "" || title == "" || isFetching ? true : false
              }
            >
              Submit
            </Button>
          </Grid>
        </Grid>
        <Box
          sx={{
            py: 2,
            display: "grid",
            gap: 2,
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          <Textarea
            minRows={4}
            placeholder="Type in here…"
            variant="solid"
            sx={{ backgroundColor: "lightblue" }}
            onChange={(e) => setDescription(e.target.value)}
            value={description}
            onBlur={(e) => setFocusedDescription(true)}
            error={description === "" && focusedDescription ? true : false}
          />
        </Box>

        <Button
          sx={{
            width: 150,
            height: 40,
            borderRadius: "30px",
            backgroundColor: "lightblue",
            display: {
              md: "none",
              xl: "none",
            },
          }}
          variant="contained"
          onClick={handleSubmit}
          // eslint-disable-next-line eqeqeq
          disabled={
            description === "" || title === "" || isFetching ? true : false
          }
        >
          Submit
        </Button>
      </Box>
    </Collapse>
  );
}
