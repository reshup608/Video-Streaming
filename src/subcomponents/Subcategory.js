import React, { useEffect } from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import { Container, Typography } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import Avatar from "@material-ui/core/Avatar";
import { postDataAndImage, getData } from "./FetchServices";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Input from "@material-ui/core/Input";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import Select from "@material-ui/core/Select";

const useStyles = makeStyles((theme) => ({
  dense: {
    // marginTop: 19,
  },
  paper: { padding: "30px", marginTop: "0px" },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  bigAvatar: {
    margin: 10,
    width: 60,
    height: 60,
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

  root: {
    padding: theme.spacing(5, 2),
  },
}));
function Subcategories(props) {
  const classes = useStyles();
  const [getlist, setList] = React.useState([]);
  const [categoryId, setCategoryId] = React.useState("");
  const [subcategoryname, setsubCategoryname] = React.useState("");
  const [subcategorydescription, setsubCategorydescription] =
    React.useState("");
  const [subcategoryIcon, setsubCategoryIcon] = React.useState({
    icon: "",
    file: "",
  });
  const [message, setMessage] = React.useState("");
  const inputLabel = React.useRef(null);
  const [getSClist, setSCList] = React.useState([]);
  const [labelWidth, setLabelWidth] = React.useState(0);
  React.useEffect(() => {
    setLabelWidth(inputLabel.current.offsetWidth);
  }, []);
  const readAllRecords = async () => {
    var list = await getData("category/displayall");
    setList(list);
  };

  useEffect(() => {
    readAllRecords();
  }, []);
  const menuList = () => {
    return getlist.map((item, index) => {
      return <MenuItem value={item.categoryid}>{item.categoryname}</MenuItem>;
    });
  };

  const addNewRecord = async () => {
    let formData = new FormData();
    formData.append("categoryid", categoryId);
    formData.append("subcategoryname", subcategoryname);
    formData.append("subcategorydescription", subcategorydescription);
    formData.append("subcategoryIcon", subcategoryIcon.file);
    const config = { headers: { "content-type": "multipart/form-data" } };
    const result = await postDataAndImage(
      "subcategory/addnewrecord",
      formData,
      config
    );
    if (result) {
      setsubCategoryname("");
      setsubCategorydescription("");
      setsubCategoryIcon("");
      setMessage("Record Submitted.....");
    } else {
      setMessage("Not Submitted..........");
    }
  };

  return (
    <Container style={{ justifyContent: "center", paddingLeft: "15%" }}>
      <Paper className={classes.paper}>
        <Typography>Subcategories Registration</Typography>
        <Grid container>
          <Grid item xs={12}>
            <FormControl
              style={{ width: "100%" }}
              variant="outlined"
              className={classes.formControl}
            >
              <InputLabel ref={inputLabel} htmlFor="outlined-age-simple">
                Category Id
              </InputLabel>
              <Select
                value={categoryId}
                onChange={(event) => setCategoryId(event.target.value)}
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
            <TextField
              style={{ width: "100%" }}
              id="outlined-dense-multiline"
              label="Subcategory Name"
              className={clsx(classes.dense)}
              margin="dense"
              variant="outlined"
              onChange={(event) => setsubCategoryname(event.target.value)}
              multiline
              rowsMax="4"
              fullWidth
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              style={{ width: "100%" }}
              id="outlined-dense-multiline"
              label="Description"
              className={clsx(classes.dense)}
              margin="dense"
              variant="outlined"
              onChange={(event) =>
                setsubCategorydescription(event.target.value)
              }
              multiline
              rowsMax="4"
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
                setsubCategoryIcon({
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
              src={subcategoryIcon.icon}
              className={classes.bigAvatar}
            />
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
  );
}
export default Subcategories;
