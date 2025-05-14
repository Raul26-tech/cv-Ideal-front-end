import Layout from "../Layout";
import Loading from "../Loading";

export default function SuspensePage() {
  return (
    <Layout>
      <div className="w-full flex justify-center">
        <Loading />
      </div>
    </Layout>
  );
}
