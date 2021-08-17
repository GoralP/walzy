import React, { useState, useEffect } from "react";
import { Main } from "../view";
import upload from "../images/upload.png";
import { Button } from "reactstrap";
import { BiPlus } from "react-icons/bi";
import { uploadFile, uploadRingtone } from "../redux/actions";
import { useDispatch } from "react-redux";
import { GrFormClose } from "react-icons/gr";
import { useHistory } from "react-router";
import List from "./List";
import soundWave from "../images/sound_wave.jpg";

const Upload = () => {
  const history = useHistory();
  const [show, setShow] = useState(true);
  const [hide, setHide] = useState(false);
  const [preview, setPreview] = useState("");
  const [formData, updateFormData] = useState("");
  const [value, setValue] = useState(0);
  const [fields, setFields] = useState([{ value: null }]);
  const [newitem, setNewitem] = useState([]);
  const [tagvalue, setTagValue] = useState("");
  const [tagtitle, setTagName] = useState("");

  const dispatch = useDispatch();

  const handleChange = (e) => {
    setTagName(e.target.value.trim());
  };

  var audio = document.createElement("audio");

  const handleChangeFile = (e) => {
    updateFormData({
      ...formData,
      [e.target.name]: e.target.files[0],
    });
    setPreview({
      ...preview,
      [e.target.name]: URL.createObjectURL(e.target.files[0]),
    });

    var target = e.currentTarget;
    var file = target.files[0];
    var aa = e.target.files[0].type;
    var bb = aa.split("/")[0];
    localStorage.setItem("fileType", bb);

    var reader = new FileReader();
    if (target.files && file) {
      var reader = new FileReader();

      reader.onload = function (e) {
        audio.src = e.target.result;
        audio.addEventListener(
          "loadedmetadata",
          function () {
            var duration = audio.duration.toFixed(0);
            localStorage.setItem("ringtone_duration", duration);
          },
          false
        );
      };
      reader.readAsDataURL(file);
    }

    setHide(true);
    setShow(false);
  };

  const handleChangeInput = (e) => {
    setTagValue(e.target.value.trim());
  };

  useEffect(() => {
    setTimeout(() => {
      updateFormData(formData);
    }, 200);
  }, [formData]);

  const onSubmit = (e) => {
    const ringtone_duration = localStorage.getItem("ringtone_duration");
    e.preventDefault();
    const getFileType = localStorage.getItem("fileType");
    if (getFileType == "image") {
      dispatch(uploadFile(formData, tagtitle, newitem, history));
      console.log("image");
    } else if (getFileType == "audio") {
      formData.ringtone_size = ringtone_duration;
      dispatch(uploadRingtone(formData, tagtitle, newitem, history));
      console.log("audio");
    }
  };

  const handleAdd = (e) => {
    console.log("tagvalue", tagvalue);
    setNewitem((prevValue) => {
      return [...prevValue, tagvalue];
    });

    console.log("formData", formData);
    setTagValue("");
    // updateFormData(" ");
    document.getElementById("tag1").value = "";
    console.log("newitem", newitem);
  };

  const handleDelete = (id) => {
    setNewitem((list) => {
      return list.filter((arrElem, index) => {
        return index !== id;
      });
    });
    console.log("delete", id);
  };

  return (
    <div>
      <section>
        <Main />
      </section>
      <form onSubmit={onSubmit}>
        {show && (
          <section className="section-upload">
            <div>
              <img src={upload} alt="" className="upload-image-select" />
            </div>
            <div className="select-file">
              <div className="input-file">
                <Button>Select File</Button>
                <input
                  type="file"
                  name="uploadfile"
                  // accept="image/*"
                  className="select-btn"
                  onChange={handleChangeFile}
                />
              </div>
            </div>
          </section>
        )}
        {hide && (
          <section className="select-image-view">
            <div className="select-image-view-inner ">
              <div className="row">
                <div className="col-sm-8 ">
                  <div className="upload-title">Upload</div>
                  <div className="upload-form">
                    <input
                      type="text"
                      placeholder="Enter title"
                      className="title-tag-input"
                      name="title"
                      onChange={handleChange}
                    />
                    {/* <div className="plus-icon-pos">
                      <input
                        type="text"
                        placeholder="Add a tag (minimum 2)"
                        className="title-tag-input"
                        name="tag"
                        onChange={handleChangeInput}
                      />

                      <span className=" plus-icon-outline">
                        <BiPlus className="plus-icon" />
                      </span>
                    </div> */}

                    {/* {fields.map((field, idx) => (
                      <div key={`${field}-${idx}`}> */}

                    {/* <div className="plus-icon-pos">
                      <input
                        type="text"
                        placeholder="Add a tag (minimum 2)"
                        className="title-tag-input"
                        name="tag"
                        onChange={handleChangeInput}
                        onChange={(e) => handleChangeAdd(idx, e)}
                      />

                      <span className=" plus-icon-outline">
                        <BiPlus
                          className="plus-icon"
                          onClick={() => handleAdd()}
                        />
                      </span>
                      <span>{formData.title}</span>
                    </div> */}

                    {/* </div>
                    ))} */}

                    {/* {fields.map((field, idx) => (
                      <div key={`${field}-${idx}`}>
                        <span>{formData.tag}</span>
                      </div>
                    ))} */}

                    <div className="plus-icon-pos">
                      <input
                        id="tag1"
                        type="text"
                        placeholder="Add a tag (minimum 2)"
                        className="title-tag-input"
                        name="tag"
                        value={formData.name}
                        onChange={handleChangeInput}
                      />

                      <span className=" ">
                        <Button onClick={handleAdd} className="plus-icon-btn">
                          <BiPlus />
                        </Button>
                      </span>

                      <div className="ml-16">
                        {newitem.map((item, index) => {
                          return (
                            <List
                              key={index}
                              id={index}
                              text={item}
                              onSelect={handleDelete}
                            />
                          );
                        })}
                      </div>
                    </div>

                    <div className="btn-block">
                      <Button className="upload-btn">Upload</Button>
                      <Button
                        className="cancel-btn"
                        onClick={() => setShow(true)}
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                </div>
                <div className="col-sm-4">
                  <img
                    src={
                      localStorage.getItem("fileType") == "image"
                        ? preview.uploadfile
                        : soundWave
                    }
                    alt=""
                    className="upload-view-image"
                  ></img>
                </div>
              </div>
            </div>
          </section>
        )}
      </form>
    </div>
  );
};

export default Upload;
