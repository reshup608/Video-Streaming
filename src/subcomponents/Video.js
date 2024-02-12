import React from "react";
import clsx from "clsx";
import { Container, Typography } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import Button from "@material-ui/core/Button";
import Avatar from "@material-ui/core/Avatar";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import { postDataAndImage, getData, postData } from "./FetchServices";

import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Input from "@material-ui/core/Input";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import Select from "@material-ui/core/Select";

const useStyles = makeStyles((theme) => ({
  paper: { padding: "30px", marginTop: "10px" },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  dense: {
    marginTop: theme.spacing(2),
  },
  menu: {
    width: 200,
  },
  group: {
    margin: theme.spacing(1, 0),
  },
  bigAvatar: {
    margin: 10,
    width: 60,
    height: 60,
  },
  input: {
    display: "none",
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 150,
  },
}));

function Video(props) {
  const classes = useStyles();

  const [categoryid, setCategoryid] = React.useState("");
  const [subcategoryid, setsubcategoryid] = React.useState("");
  const [videotitle, setvideotitle] = React.useState("");
  const [videometadata, setvideometadata] = React.useState("");
  const [videodescription, setvideodescription] = React.useState("");
  const [status, setstatus] = React.useState("");
  const [amount, setamount] = React.useState("");
  const [poster, setposter] = React.useState({ icon: "", file: "" });
  const [Videourl, setvideourl] = React.useState({ file: "" });
  const [statusepisode, setstatusepisode] = React.useState("");
  const [message, setMessage] = React.useState("");
  const inputLabel = React.useRef(null);
  const [labelWidth, setLabelWidth] = React.useState(0);
  const [getList, setList] = React.useState([]);
  const [getSCList, setSCList] = React.useState([]);
  React.useEffect(() => {
    readAllRecords();
    setLabelWidth(inputLabel.current.offsetWidth);
  }, []);
  const readAllSCRecords = async (categoryid) => {
    let body = { categoryid: categoryid };
    var list = await postData("subcategory/displayByCategoryId", body);
    setSCList(list);
  };
  const menuSCList = () => {
    console.log(getSCList);
    return getSCList.map((item, index) => {
      return (
        <MenuItem value={item.subcategoryid}>{item.subcategoryname}</MenuItem>
      );
    });
  };
  const readAllRecords = async () => {
    var list = await getData("category/displayall");
    setList(list);
  };
  const menuList = () => {
    return getList.map((item, index) => {
      return <MenuItem value={item.categoryid}>{item.categoryname}</MenuItem>;
    });
  };

  const addnewrecord = () => {
    let formData = new FormData();
    formData.append("categoryid", categoryid);

    formData.append("subcategoryid", subcategoryid);
    formData.append("videotitle", videotitle);
    formData.append("videometadata", videometadata);
    formData.append("videodescription", videodescription);
    formData.append("status", status);
    formData.append("amount", amount);
    formData.append("poster", poster.file);
    formData.append("videourl", Videourl.file);
    formData.append("statusepisode", statusepisode);
    const config = { headers: { "content-type": "multipart/form-data" } };
    const result = postDataAndImage("video/addnewrecord", formData, config);
    if (!result) {
      setMessage("Record Submitted.....");
    } else {
      setMessage("Not Submitted..........");
    }
  };

  const onCategoryChange = (event) => {
    setCategoryid(event.target.value);
    readAllSCRecords(event.target.value);
  };

  return (
    <Container style={{ justifyContent: "center", paddingLeft: "15%" }}>
      <Paper className={classes.paper}>
        <Typography>Add Video Form</Typography>
        <Grid item xs={12}>
          <FormControl
            style={{ width: "100%" }}
            variant="outlined"
            className={classes.formControl}
          >
            <InputLabel ref={inputLabel} htmlFor="outlined-age-simple">
              Categories
            </InputLabel>
            <Select
              value={categoryid}
              onChange={(event) => onCategoryChange(event)}
              input={
                <OutlinedInput
                  labelWidth={labelWidth}
                  name="age"
                  id="outlined-age-simple"
                />
              }
            >
              {menuList()}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <FormControl
            style={{ width: "100%" }}
            variant="outlined"
            className={classes.formControl}
          >
            <InputLabel ref={inputLabel} htmlFor="outlined-age-simple">
              Sub Categories
            </InputLabel>
            <Select
              value={subcategoryid}
              onChange={(event) => setsubcategoryid(event.target.value)}
              input={
                <OutlinedInput
                  labelWidth={labelWidth}
                  name="age"
                  id="outlined-age-simple"
                />
              }
            >
              {menuSCList()}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12}>
          <TextField
            style={{ width: "100%" }}
            id="outlined-dense"
            label="Video Title"
            className={clsx(classes.dense)}
            margin="dense"
            variant="outlined"
            onChange={(event) => setvideotitle(event.target.value)}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            style={{ width: "100%" }}
            id="outlined-dense"
            label="VideoMetadata"
            className={clsx(classes.dense)}
            margin="dense"
            variant="outlined"
            onChange={(event) => setvideometadata(event.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            style={{ width: "100%" }}
            id="outlined-multiline-flexible"
            label="Video Description"
            multiline
            rowsMax="4"
            // className={classes.textField}
            margin="normal"
            variant="outlined"
            onChange={(event) => setvideodescription(event.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <FormControl
            component="fieldset"
            style={{ width: "100%" }}
            className={classes.formControl}
          >
            <FormLabel component="legend">Status</FormLabel>
            <RadioGroup
              aria-label="gender"
              name="gender1"
              className={classes.group}
            >
              <FormControlLabel
                value="free"
                onChange={(event) => setstatus(event.target.value)}
                control={<Radio />}
                label="Free"
              />
              <FormControlLabel
                value="Paid"
                onChange={(event) => setstatus(event.target.value)}
                control={<Radio />}
                label="Paid"
              />
            </RadioGroup>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <TextField
            style={{ width: "100%" }}
            id="outlined-dense"
            label="Amount"
            className={clsx(classes.dense)}
            margin="dense"
            variant="outlined"
            onChange={(event) => setamount(event.target.value)}
          />
        </Grid>
        <Grid container justify="center" alignItems="center">
          <Avatar
            alt="Remy Sharp"
            src={poster.icon}
            className={classes.bigAvatar}
          />
        </Grid>
        <Grid item xs={12}>
          <input
            accept="image/*"
            className={classes.input}
            id="contained-button-file"
            multiple
            type="file"
            onChange={(event) =>
              setposter({
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
        <Grid item xs={12}>
          <input
            accept="video/*"
            className={classes.input}
            id="contained-button-file1"
            multiple
            type="file"
            onChange={(event) => setvideourl({ file: event.target.files[0] })}
          />
          <label htmlFor="contained-button-file1">
            <Button
              variant="contained"
              component="span"
              className={classes.button}
            >
              Upload Video
              <CloudUploadIcon className={classes.rightIcon} />
            </Button>
          </label>
        </Grid>
        <Grid item xs={12}>
          <FormControl component="fieldset" className={classes.formControl}>
            <FormLabel component="legend">EpisodeStatus</FormLabel>
            <RadioGroup
              aria-label="statusepisode"
              name="statusepisode1"
              className={classes.group}
            >
              <FormControlLabel
                value="Yes"
                onChange={(event) => setstatusepisode(event.target.value)}
                control={<Radio />}
                label="Yes"
              />
              <FormControlLabel
                value="No"
                onChange={(event) => setstatusepisode(event.target.value)}
                control={<Radio />}
                label="No"
              />
            </RadioGroup>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <Button
            variant="contained"
            color="primary"
            onClick={addnewrecord}
            className={classes.button}
            fullWidth
          >
            Submit
          </Button>
        </Grid>

        <Typography>{message}</Typography>
      </Paper>
    </Container>
  );
}
export default Video;
