import Navbar from "../components/fragments/Navbar/Navbar.component";
import Footer from "../components/fragments/Footer/Footer.component";
import styled from "styled-components";
import SalonResultsParameters from "../components/salon-search-results/SalonResultsParameters/SalonResultsParameters.component";
import Search from "../components/fragments/Search/Search.component";
import SalonResults from "../components/salon-search-results/SalonResults/SalonResults.component";

function SalonSearchResults() {
  return (
    <>
      <Navbar />
      <Search />
      <SalonSearchResultsContainer>
        <div></div>
        <SalonResultsParameters />
        <SalonResults />
      </SalonSearchResultsContainer>
      <Footer />
    </>
  );
}

const SalonSearchResultsContainer = styled.div`
  min-height: calc(100vh - 55px);
  padding: 0 8vw 10vh;
  gap: 1em;

  display: grid;
  grid-template-columns: 20% 80%;
  grid-template-rows: 5em auto;
`;

export default SalonSearchResults;
