import { useDisclosure, useMediaQuery } from '@mantine/hooks';
import { Modal, Button } from '@mantine/core';
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { uploadImage } from "../../actions/uploadAction";
import { updateUser } from "../../actions/UserAction";

function ProfileModal({modalOpened,setModalOpened, data}) {

  const isMobile = useMediaQuery('(max-width: 50em)');
  const { password, ...other } = data;
  const [formData, setFormData] = useState(other);
  const [profileImage, setProfileImage] = useState(null);
  const [coverImage, setCoverImage] = useState(null);
  const dispatch = useDispatch();
  const param = useParams();
  const { user } = useSelector((state) => state.authReducer.authData);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0];
      event.target.name === "profileImage"
        ? setProfileImage(img)
        : setCoverImage(img);
    }
  };

  // form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    let UserData = formData;
    if (profileImage) {
      const data = new FormData();
      const fileName = Date.now() + profileImage.name;
      data.append("name", fileName);
      data.append("file", profileImage);
      UserData.profilePicture = fileName;
      try {
        dispatch(uploadImage(data));
      } catch (err) {
        console.log(err);
      }
    }
    if (coverImage) {
      const data = new FormData();
      const fileName = Date.now() + coverImage.name;
      data.append("name", fileName);
      data.append("file", coverImage);
      UserData.coverPicture = fileName;
      try {
        dispatch(uploadImage(data));
      } catch (err) {
        console.log(err);
      }
    }
    dispatch(updateUser(param.id, UserData));
    setModalOpened(false);
  };

  return (
    <>
      <Modal
        opened={modalOpened}
        onClose={()=>setModalOpened(false)}
        fullScreen={isMobile}
        size='55%'
        transitionProps={{ transition: 'fade', duration: 200 }}
      >
        <form className='infoForm'>
            <h3>Your info</h3>
            <div>
                <input type="text" className='infoInput' name='firstname' placeholder='First Name' value={formData.firstname} onChange={handleChange} />
                <input type="text" className='infoInput' name='lastname' placeholder='Last Name' value={formData.lastname} onChange={handleChange} />
            </div>
            <div>
                <input type="text" className='infoInput' name='worksAt' placeholder='Works at' value={formData.worksAt} onChange={handleChange} />
            </div>
            <div>
                <input type="text" className='infoInput' name='livesin' placeholder='Lives in' value={formData.livesin} onChange={handleChange} />
                <input type="text" className='infoInput' name='country' placeholder='Country' value={formData.country} onChange={handleChange} />
            </div>
            <div>
                <input type="text" className='infoInput' name='relationship' placeholder='Rlationship Status'value={formData.relationship} onChange={handleChange} />
            </div>
            <div>
                Profile Image
                <input type="file" name='profileImage' onChange={onImageChange} />
                Cover Image
                <input type="file" name="coverImage" onChange={onImageChange} />
            </div>
            <button className='button infoButton' onClick={handleSubmit}>Update</button>
        </form>
      </Modal>

    </>
  );
}
export default ProfileModal