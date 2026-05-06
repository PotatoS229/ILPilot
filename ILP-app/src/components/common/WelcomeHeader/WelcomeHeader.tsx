
interface HeaderProps {
    name: string;
    label: string;
};
const WelcomeHeader = ({name, label}: HeaderProps) => (
  <div className="welcome-header">
    <h1>{name}</h1>
    <p>{label}</p>
  </div>
);

export default WelcomeHeader;
// ⚙️