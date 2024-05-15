import Layout from "../../components/Layout/Layout";
import Button from "../../components/Buttons/Button";

const Loading = () => {
  return (
    <Layout>
      <div className="flex justify-between items-center max-w-[700px] w-full bg-[#131313] p-4 rounded-[16px]">
        <div className="animate-pulse flex flex-col gap-[20px]">
          <h1 className="text-[24px] text-gray-100">Profile</h1>

          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <h2 className="text-[20px] text-gray-100 w-20">Name:</h2>
              <div className="h-6 bg-gray-700 w-40 rounded"></div>
            </div>

            <div className="flex items-center gap-2">
              <h2 className="text-[20px] text-gray-100 w-20">Email:</h2>
              <div className="h-6 bg-gray-700 w-40 rounded"></div>
            </div>

            <div className="flex items-center gap-2">
              <h2 className="text-[20px] text-gray-100 w-20">Role:</h2>
              <div className="h-6 bg-gray-700 w-40 rounded"></div>
            </div>
          </div>

          <div className="grid gap-3">
            <Button>Logout</Button>
            <Button>Delete Account</Button>
            {/* <a
                href="/member/list"
                className="text-red-500 hover:text-green-600"
              >
                Member List
              </a> */}
          </div>
        </div>

        <div className="animate-pulse">
          <div className="h-[300px] bg-gray-700 w-[300px] rounded-full"></div>
        </div>
      </div>
    </Layout>
  );
};

export default Loading;
