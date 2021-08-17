import React, { useState, useEffect } from "react";
import { Main } from "../view";
import { Button } from "reactstrap";
import { getProfile, updateProfile } from "../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { history, useHistory } from "react-router-dom";

const EditProfile = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [formData, updateFormData] = useState("");

  const { loading, profileData } = useSelector((state) => ({
    loading: state.profileReducers.profile.loading,
    profileData: state.profileReducers.profile.profileData,
  }));
  // console.log("chk", profileData);

  useEffect(() => {
    dispatch(getProfile());
  }, [dispatch]);

  const handleChange = (e) => {
    updateFormData({
      ...formData,
      [e.target.name]: e.target.value.trim(),
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(updateProfile(formData, history));
  };

  const onCancel = (e) => {
    history.push("/profile");
  };

  return (
    <div>
      <section>
        <Main />
      </section>
      <section className="edit-profile-view">
        <div className="edit-profile-inner">
          {loading ? (
            <div>Loading...</div>
          ) : (
            profileData !== null && (
              <form encType="multipart/form-data">
                <input
                  type="text"
                  placeholder="Username"
                  className="title-tag-input"
                  name="name"
                  defaultValue={profileData.name}
                  onChange={handleChange}
                  disabled
                />
                <input
                  type="text"
                  placeholder="Display name"
                  className="title-tag-input"
                  name="displayname"
                  defaultValue={profileData.displayname}
                  onChange={handleChange}
                />
                <textarea
                  // type="textarea"
                  placeholder="About"
                  className="about-input"
                  name="about"
                  defaultValue={profileData.about}
                  onChange={handleChange}
                />
                <div className="btn-block">
                  <Button className="upload-btn" onClick={onSubmit}>
                    Update
                  </Button>

                  <Button className="cancel-btn" onClick={onCancel}>
                    Cancel
                  </Button>
                </div>
              </form>
            )
          )}
        </div>
      </section>
    </div>
  );
};

export default EditProfile;
