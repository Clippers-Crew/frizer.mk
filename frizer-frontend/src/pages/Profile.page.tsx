import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ProfileBanner from "../components/Profile/ProfileBanner/ProfileBanner.component";
import ProfileInfo from "../components/Profile/ProfileInfo/ProfileInfo.component";
import ProfileEditDetailsForm from "../components/Profile/ProfileEditDetailsForm/ProfileEditDetailsForm.component";
import ProfileAddSalonForm from "../components/Profile/ProfileAddSalonForm/ProfileAddSalonForm.component";
import Navbar from "../components/fragments/Navbar/Navbar.component";
import Footer from "../components/fragments/Footer/Footer.component";
import { User } from "../context/Context";
import UserService from "../services/user.service";
import ProfileOwnedSalons from "../components/Profile/ProfileOwnedSalons/ProfileOwnedSalons.component";
import ProfileEditSalonForm from "../components/Profile/ProfileEditSalonForm/ProfileEditSalonForm.component";
import ProfileFavouriteSalons from "../components/Profile/ProfileFavouriteSalons/ProfileFavouriteSalons.component";

function Profile() {
const [user, setUser] = useState<User | null>();

useEffect(() => {
  const fetchCurrentUser = async () => {
    try {
      const response = await UserService.getCurrentUser();
      setUser(response);
    } catch (error) {
      console.error("Failed to fetch user:", error);
    }
  };

  fetchCurrentUser();
}, [])

  return (
    <>
      <Navbar />
      <ProfileBanner />
      <ProfileContainer>
        {/* <ProfileInfo /> */}
        <ProfileEditDetailsForm currentUser={user}/>
        <ProfileFavouriteSalons currentUser={user} />
        <ProfileOwnedSalons />
        <ProfileEditSalonForm />
        <ProfileAddSalonForm />
      </ProfileContainer>
      <Footer />
    </>
  );
}

const ProfileContainer = styled.div`
  padding: 0 8vw;
  min-height: calc(100vh - 55px);
`;

export default Profile;
