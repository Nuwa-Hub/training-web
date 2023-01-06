import {
  uniqueNamesGenerator,
  Config,
  adjectives,
  colors,
} from "unique-names-generator";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import * as React from "react";

import Typography from "@mui/material/Typography";
import { Button, Grid, Paper, TextField } from "@mui/material";
import { Box } from "@mui/system";
import { useDispatch } from "react-redux/es/exports";
import { loginSuccess } from "./UserSlice";

export default function Login() {
  const [nickName, setNickName] = React.useState("");
  const [focused, setFocus] = React.useState(false);
  const distpatch = useDispatch();
  const customConfig: Config = {
    dictionaries: [adjectives, colors],
    separator: "-",
    length: 2,
  };

  // const randomName: string = uniqueNamesGenerator({
  //   dictionaries: [adjectives, colors, animals],
  // }); // big_red_donkey

  const shortName: string = uniqueNamesGenerator(customConfig).replace(
    "-",
    " "
  ); // big-donkey

  const handleSubmit = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    distpatch(loginSuccess(nickName));
  };
  const changeNickName = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setNickName(shortName);
  };
  return (
    <Box>
      <Paper
        sx={{
          width: {
            xs: 300,
            md: 700,
            xl: 800,
          },
          height: {
            xs: 300,
            md: 300,
            xl: 300,
          },

          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-around",
          marginTop: { xs: "15em", md: "15em", xl: "15em" },
          margin: "auto",
          padding: "10px",
          borderRadius: "20px",
        }}
      >
        <Typography variant="h3" sx={{ color: "blue" }}>
          Sign In
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={8}>
            <TextField
              autoComplete="given-name"
              name="nickName"
              required
              fullWidth
              id="nickName"
              label="Your Nick Name"
              autoFocus
              value={nickName}
              onChange={(e) => setNickName(e.target.value)}
              onBlur={(e) => setFocus(true)}
              // eslint-disable-next-line no-restricted-globals
              error={nickName === "" && focused}
              helperText={nickName === "" && focused ? "Empty field!" : " "}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <Button
              onClick={changeNickName}
              sx={{ width: 150, height: 50, borderRadius: "30px" }}
              variant="contained"
            >
              Random
            </Button>
          </Grid>
        </Grid>
        <Button
          sx={{ width: 150, height: 50, borderRadius: "30px" }}
          variant="contained"
          endIcon={<ArrowForwardIcon />}
          onClick={handleSubmit}
          // eslint-disable-next-line eqeqeq
          disabled={nickName == "" ? true : false}
        >
          continue
        </Button>
      </Paper>
    </Box>
  );
}