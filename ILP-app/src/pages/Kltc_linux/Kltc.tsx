import './Kltc.css';
import WelcomeHeader from '../../components/common/WelcomeHeader/WelcomeHeader';
import SideMenu from '../../components/common/SideMenu/SideMenu';
import PageFooter from '../../components/common/PageFooter/PageFooter';


const KltcPage = () => {
    return (
    <div className="dashboard-card">
        <WelcomeHeader name="Kltc" label="aaaaaaaaaaaaa"/>
        <div className="main-layout">
            <SideMenu />
            <div className="content-preview">
                <h3>OS</h3>
                <div className="os-buttons-container">
                    <button className="os-btn windows-btn">
                        <span className="os-icon">🪟</span>
                        <span className="os-name">Windows</span>
                        <span className="os-version">11/10/8</span>
                    </button>
                    <button className="os-btn linux-btn">
                        <span className="os-icon">🐧</span>
                        <span className="os-name">Linux</span>
                        <span className="os-version">Ubuntu/Debian/CentOS</span>
                    </button>
                </div>
            </div>
        </div>
        <PageFooter />
    </div>
    )
}

export default KltcPage;