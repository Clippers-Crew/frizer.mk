import React from 'react'
import FeatureImages from '../components/salonDetails/FeatureImages/FeatureImages.component';
import { Salon } from '../interfaces/Salon.interface';
import SalonBaseInfo from '../components/salonDetails/SalonBaseInfo/SalonBaseInfo.component';
import styled from 'styled-components';
import TreatmentList from '../components/salonDetails/TreatmentList/TreatmenList.component';

interface SalonDetailsProps{
  salon: Salon;
}
function SalonDetails({salon}: SalonDetailsProps) {
  return (
    <PageContainer>
    <div>SalonDetails</div>
    <FeatureImages salon={salon}/>
    <SalonBaseInfo salon={salon}/>
    <TreatmentList salon={salon}/>
    </PageContainer>

  )
}

const PageContainer = styled.div`
  padding: 10vw 5em;
`

export default SalonDetails;