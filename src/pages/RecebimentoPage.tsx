import Layout from "@/components/Layout";
import RecebimentoConcreto from "@/components/RecebimentoConcreto";

const RecebimentoPage = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-4">
        <RecebimentoConcreto />
      </div>
    </Layout>
  );
};

export default RecebimentoPage;
