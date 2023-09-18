import Pages from "@/pages";
import {  Header, Footer, ScrollToTop } from "@/components";

function App(): JSX.Element {
  return (
    <>
      <Header />
      <Pages />
      <ScrollToTop />
      <Footer />
    </>
  );
}
export default App;
