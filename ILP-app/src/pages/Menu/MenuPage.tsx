import './MenuPage.css';
import WelcomeHeader from '../../components/common/WelcomeHeader/WelcomeHeader';
import  SideMenu  from '../../components/common/SideMenu/SideMenu';
import ContentPreview from '../../components/menuPage/ContentPreview/ContentPreview';
import PageFooter from '../../components/common/PageFooter/PageFooter';


interface dataProps {
  data:{
    timestamp: string;
    throughput: number;
    latency: number;
  }[];
}


const MenuPage = ({data}: dataProps) => {
  return (
    <div className="dashboard-card">
      <SideMenu />
      <main className="main-content fade-in">
        <WelcomeHeader name="Menu Page" label="This is menu"/>
        <div className="main-layout">
          <ContentPreview trafficData={data}/>
        </div>
        <PageFooter />
      </main>
    </div>
  );
};

export default MenuPage;