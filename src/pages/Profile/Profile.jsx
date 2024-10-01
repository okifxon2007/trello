import React from "react";
import profileBg from "../images/Profile/profileBg.svg";
import profileImg from "../images/Profile/Group 1000004098.svg";
import uploadImg from "../images/Profile/Group 1000004108.svg";

const Profile = () => {
  return (
    <>
      <div className="p-[30px]">
        <img src={profileBg} className="w-full" alt="" />
        <div className="main px-[50px]">
          <ul className="flex justify-between items-start pt-5">
            <li className="flex gap-[30px]">
              <img
                src={profileImg}
                width={137}
                height={137}
                className="relative bottom-[60px]"
                alt=""
              />
              <h1 className="text-[30px] font-bold">Settings</h1>
            </li>
            <li className="flex gap-[10px]">
              <button className="btn-def border-def">Cancel</button>
              <button className="btn-def bg-def-blue text-white">Save</button>
            </li>
          </ul>
          <ul className="flex gap-[30px] pl-2">
            <li className="text-[#232360] font-medium">My details</li>
            <li className="text-[#6A7181] font-medium">Profile</li>
            <li className="text-[#6A7181] font-medium">Password</li>
            <li className="text-[#6A7181] font-medium">Team</li>
            <li className="text-[#6A7181] font-medium">Plan</li>
            <li className="text-[#6A7181] font-medium">Billing</li>
            <li className="text-[#6A7181] font-medium">Email</li>
            <li className="text-[#6A7181] font-medium">Notifications</li>
          </ul>
          <div className="pl-2 pt-[50px]">
            <div className="flex gap-6">
              <label className="label-def">
                <p>First name</p>
                <input
                  type="text"
                  placeholder="Killan"
                  className="px-[17px] py-[13px] w-[348px] border-def bg-transparent"
                />
              </label>
              <label className="label-def">
                <p>Last name</p>
                <input
                  type="text"
                  placeholder="James"
                  className="px-[17px] py-[13px] w-[348px] border-def bg-transparent"
                />
              </label>
            </div>
          </div>
          <div className="w-[640px] h-[1px] bg-[#EEEEF4] my-6"></div>
          <label className="label-def">
            <p>First name</p>
            <div className="flex items-center relative right-[20px]">
              <i class="relative right-[-37px] fa-regular fa-envelope text-[20px]"></i>
              <input
                type="text"
                placeholder="killanjames@gmail.com"
                className="px-[47px] py-[13px] w-[512px] border-def bg-transparent"
              />
            </div>
          </label>
          <div className="w-[640px] h-[1px] bg-[#EEEEF4] my-6"></div>
          <img src={uploadImg} alt="" />
          <label className="label-def mt-6">
            <p>First name</p>
            <input
              type="text"
              placeholder="Product Designer"
              className="px-[17px] py-[13px] w-[512px] border-def bg-transparent"
            />
          </label>
        </div>
      </div>
    </>
  );
};

export default Profile;
