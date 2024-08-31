import React, { useEffect, useState } from "react";
import FeatureImages from "../components/salonDetails/FeatureImages/FeatureImages.component";
import { Salon } from "../interfaces/Salon.interface";
import SalonBaseInfo from "../components/salonDetails/SalonBaseInfo/SalonBaseInfo.component";
import styled from "styled-components";
import TreatmentList from "../components/salonDetails/TreatmentList/TreatmenList.component";
import SalonService from "../services/salon.service";
import { useParams } from "react-router-dom";
import Footer from "../components/fragments/Footer/Footer.component";
import Navbar from "../components/fragments/Navbar/Navbar.component";
import SalonMap from "../components/salonDetails/SalonMap/SalonMap.component";
import EmployeeList from "../components/salonDetails/EmployeeList/EmployeeList.component";
import ReviewList from "../components/salonDetails/ReviewList/ReviewList.component";

function SalonDetails() {
  const { id } = useParams();
  const [salon, setSalon] = useState<Salon>();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchSalon = async () => {
      try {
        if (id) {
          const response = await SalonService.getSalon(+id);
          setSalon(response.data);
        }
      } catch (error) {
        console.error("Error fetching salon:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSalon();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Navbar />
      <PageContainer>
        <FeatureImages salon={salon} />
        <SalonBaseInfo salon={salon} />
        <TreatmentList salon={salon} />
        <ReviewList salon={salon} />
        <EmployeeList salon={salon}/>
        <SalonMap salon={salon} />
      </PageContainer>
      <Footer />
    </>
  );
}

const PageContainer = styled.div`
  padding: 5em 8vw 0;
`;

export default SalonDetails;
