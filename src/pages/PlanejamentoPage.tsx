import Layout from "@/components/Layout";
import PlanejamentoVolume from "@/components/PlanejamentoVolume";

const PlanejamentoPage = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-4">
        <PlanejamentoVolume />
      </div>
    </Layout>
  );
};

export default PlanejamentoPage;
