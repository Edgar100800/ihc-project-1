
import ButtonNewMedia from "@/components/dashboard/SidePanel/ButtonNewMedia";
import UserInfo from "@/components/dashboard/SidePanel/UserInfo";
import ListMedia from "@/components/dashboard/SidePanel/ListMedia";
import LogOutButtom from "@/components/dashboard/SidePanel/LogOutButtom";

import MediaDescription from "@/components/dashboard/MainPanel/MediaDescription";
import UploadImage from "@/components/dashboard/MainPanel/UploadImage";
export default function Dashboard() {

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-md">
        <div className="flex flex-col h-full">
          {/* User info */}
          <UserInfo />

          {/* Create new button */}
          <ButtonNewMedia />

          {/* List of items */}
          <ListMedia />

          {/* Logout button */}
          <LogOutButtom/>
        </div>
      </div>

      {/* Main content area */}
      <div className="flex-1 p-8 overflow-auto ">
        <MediaDescription />
        <UploadImage />
        <p className="text-gray-600">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </p>
        <p className="mt-4 text-gray-600">
          Sed ut perspiciatis unde omnis iste natus error sit voluptatem
          accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae
          ab illo inventore veritatis et quasi architecto beatae vitae dicta
          sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit
          aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos
          qui ratione voluptatem sequi nesciunt.
        </p>
      </div>
    </div>
  );
}
