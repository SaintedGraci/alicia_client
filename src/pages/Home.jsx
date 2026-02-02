import Header from '../components/header.jsx';
import Body from '../components/body.jsx';
import FunctionalitySlider from '../components/FunctionalitySlider.jsx';
import Footer from '../components/footer.jsx';

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Body />
      <FunctionalitySlider />
      <Footer />
    </div>
  );
};

export default Home;