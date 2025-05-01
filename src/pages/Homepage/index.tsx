import Layout from "../../components/Layout";
import logo from "../../assets/cv-Ideal.png";

export default function Homepage() {
  return (
    <Layout>
      <span className="text-3xl">Sejá bem-vindo(a) ao Cv-Ideal</span>
      <img src={logo} alt="Logo" />
    </Layout>
  );
}
