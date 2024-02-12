import React, { useEffect } from "react";
import clsx from "clsx";
import {
  Typography,
  Grid,
  TextField,
  Container,
  Paper,
  Radio,
  RadioGroup,
  Button,
  Avatar,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { FormControl, MenuItem } from "@material-ui/core";
// import FormLabel from '@material-ui/core/FormLabel';
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import { postDataAndImage, getData, postData } from "./FetchServices";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: "30px",
    marginTop: "10px",
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  dense: {
    marginTop: theme.spacing(2),
  },
  button: {
    margin: theme.spacing(1),
  },
  input: {
    display: "none",
  },
  rightIcon: {
    marginLeft: theme.spacing(1),
  },
  bigAvatar: {
    margin: 10,
    width: 60,
    height: 60,
  },
  margin: {
    margin: theme.spacing(1),
  },
  textField1: {
    flexBasis: 200,
  },
  menu: {
    width: 200,
  },
}));

export default function Episode(props) {
  const [categoryId, setCategoryId] = React.useState("");
  const [subCategoryId, setSubCategoryId] = React.useState("");
  const [videoId, setVideoId] = React.useState("");
  const [episodeTitle, setEpisodeTitle] = React.useState("");
  const [episodeDescription, setEpisodeDescription] = React.useState("");
  const [episodeIcon, setEpisodeIcon] = React.useState({ icon: "", file: "" });
  const [episodeUrl, setEpisodeUrl] = React.useState("");
  const [message, setMessage] = React.useState("see here..");
  const classes = useStyles();

  const addNewRecord = async () => {
    let formData = new FormData();
    formData.append("videoId", videoId);
    formData.append("episodeTitle", episodeTitle);
    formData.append("episodeDescription", episodeDescription);
    formData.append("episodeIcon", episodeIcon.file);
    formData.append("episodeUrl", episodeUrl);
    var config = { headers: { "content-type": "multipart/form-data" } };
    var result = await postDataAndImage(
      "episode/addnewepisode",
      formData,
      config
    );
    if (result) {
      setMessage("Record Submitted...");
      setCategoryId("");
      setSubCategoryId("");
      setVideoId("");
      setEpisodeTitle("");
      setEpisodeDescription("");
      setEpisodeIcon({ icon: "" });
      setEpisodeUrl("");
    } else {
      setMessage("Fail to Submit Record...");
      setCategoryId("");
      setSubCategoryId("");
      setVideoId("");
      setEpisodeTitle("");
      setEpisodeDescription("");
      setEpisodeIcon({ icon: "" });
      setEpisodeUrl("");
    }
  };

  const [getCategoryList, setCategoryList] = React.useState([]);

  const readAllRecords = async () => {
    var list = await getData("category/displayall");
    setCategoryList(list);
  };

  useEffect(() => {
    readAllRecords();
  }, []);

  const [getSubCategoryList, setSubCategoryList] = React.useState([]);

  const [getVideoList, setVideoList] = React.useState([]);

  const readAllSCrecords = async (Categoryid) => {
    let body = { categoryid: Categoryid };
    var list = await postData("subcategory/displayByCategoryId", body);
    setSubCategoryList(list);
  };

  const handleCategory = (event) => {
    setCategoryId(event.target.value);
    readAllSCrecords(event.target.value);
  };

  const readAllVRecords = async (Subcategoryid) => {
    let body = { subcategoryid: Subcategoryid };
    var list = await postData("video/displayBySubCategoryId", body);
    setVideoList(list);
  };

  const handleSubCategory = (event) => {
    setSubCategoryId(event.target.value);
    readAllVRecords(event.target.value);
  };

  return (
    <div>
      <Container style={{ justifyContent: "center", paddingLeft: "15%" }}>
        <Paper className={classes.paper}>
          <Typography>Episode</Typography>
          <Grid container>
            <Grid item xs={12}>
              <TextField
                id="outlined-select-currency"
                select
                label="Category"
                className={classes.textField}
                value={categoryId}
                onChange={(event) => handleCategory(event)}
                SelectProps={{
                  MenuProps: {
                    className: classes.menu,
                  },
                }}
                margin="normal"
                variant="outlined"
                fullWidth
              >
                {getCategoryList.map((item) => (
                  <MenuItem
                    key={item.categoryid}
                    value={item.categoryid}
                    fullWidth
                  >
                    {item.categoryname}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="outlined-select-currency"
                select
                label="Sub-category"
                className={classes.textField}
                value={subCategoryId}
                onChange={(event) => handleSubCategory(event)}
                SelectProps={{
                  MenuProps: {
                    className: classes.menu,
                  },
                }}
                margin="normal"
                variant="outlined"
                fullWidth
              >
                {getSubCategoryList.map((item) => (
                  <MenuItem
                    key={item.subcategoryid}
                    value={item.subcategoryid}
                    fullWidth
                  >
                    {item.subcategoryname}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="outlined-select-currency"
                select
                label="Video"
                className={classes.textField}
                value={videoId}
                onChange={(event) => setVideoId(event.target.value)}
                SelectProps={{
                  MenuProps: {
                    className: classes.menu,
                  },
                }}
                margin="normal"
                variant="outlined"
                fullWidth
              >
                {getVideoList.map((item) => (
                  <MenuItem key={item.videoid} value={item.videoid} fullWidth>
                    {item.videotitle}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="outlined-dense"
                label="Episode Title"
                className={clsx(classes.textField, classes.dense)}
                margin="dense"
                variant="outlined"
                onChange={(event) => setEpisodeTitle(event.target.value)}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="outlined-dense"
                label="Description"
                className={clsx(classes.textField, classes.dense)}
                margin="dense"
                variant="outlined"
                onChange={(event) => setEpisodeDescription(event.target.value)}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <input
                accept="image/*"
                className={classes.input}
                id="contained-button-file"
                multiple
                type="file"
                onChange={(event) =>
                  setEpisodeIcon({
                    icon: URL.createObjectURL(event.target.files[0]),
                    file: event.target.files[0],
                  })
                }
              />
              <label htmlFor="contained-button-file">
                <Button
                  variant="contained"
                  component="span"
                  className={classes.button}
                >
                  Upload
                  <CloudUploadIcon className={classes.rightIcon} />
                </Button>
              </label>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Avatar
                alt="Image"
                src={episodeIcon.icon}
                className={classes.bigAvatar}
              />
            </Grid>
            <Grid item xs={12}>
              <input
                className={classes.input}
                id="contained-button-file1"
                multiple
                type="file"
                onChange={(event) => setEpisodeUrl(event.target.files[0])}
              />
              <label htmlFor="contained-button-file1">
                <Button
                  variant="contained"
                  component="span"
                  className={classes.button}
                  fullWidth
                >
                  Upload Video
                  <CloudUploadIcon className={classes.rightIcon} />
                </Button>
              </label>
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="contained"
                onClick={addNewRecord}
                color="primary"
                className={classes.button}
                fullWidth
              >
                Submit
              </Button>
            </Grid>
          </Grid>
        </Paper>
        <Typography>{message}</Typography>
      </Container>
    </div>
  );
}
