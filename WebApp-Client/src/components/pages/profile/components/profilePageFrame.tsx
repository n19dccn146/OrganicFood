import React from 'react';
import Sidebar from './sidebar';

type Props = {
  children: React.ReactNode;
};

const ProfilePageFrame = (props: Props) => {
  return (
    <div className="my-[30px] h-full">
      <div className="grid grid-cols-4 gap-8">
        <div className="col-span-1">
          <Sidebar />
        </div>
        <div className="col-span-3">{props.children}</div>
      </div>
    </div>
  );
};

export default ProfilePageFrame;
