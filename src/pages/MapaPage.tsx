import Layout from "@/components/Layout";
import MapaConcretagem from "@/components/MapaConcretagem";

const MapaPage = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-4">
        <MapaConcretagem />
      </div>
    </Layout>
  );
};

export default MapaPage;
