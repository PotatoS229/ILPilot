import './MenuPage.css';
import WelcomeHeader from '../../components/common/WelcomeHeader/WelcomeHeader';
import SideMenu from '../../components/common/SideMenu/SideMenu';
import ContentPreview from '../../components/menuPage/ContentPreview/ContentPreview';
import PageFooter from '../../components/common/PageFooter/PageFooter';

const MenuPage = () => {
  return (
    <div className="dashboard-card">
      <WelcomeHeader name="Menu Page" label="This is menu"/>
      <div className="main-layout">
        <SideMenu />
        <ContentPreview />
      </div>
      <PageFooter />
    </div>
  );
};

export default MenuPage;