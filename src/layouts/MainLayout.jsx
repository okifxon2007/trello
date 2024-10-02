import React from "react";
import logo from "../assets/images/logo.svg";
import { Link, NavLink } from "react-router-dom";
// import category from "./images/navImages/cate";

function MainLayout({ children }) {

  function handlelocal(e){
    e.preventDefault()
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    window.location.reload()
  }
  return (
    <div className="bg-[#F3F7FA] h-[1224px]">
      <div className="flex">
        <div className="vertical h-[1224px] flex flex-col bg-[#FBFAFF] px-[15px] py-5 items-center ">
          <img src={logo} alt="" />
          <ul className="pt-[150px] flex flex-col gap-[33px] justify-center items-center">
            <NavLink to="/board">
              <li className="p-[13px] rounded-[14px]">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M15.5 13C15.0478 13 14.4089 13.0625 13.7438 13.1536C13.4331 13.1962 13.1962 13.4331 13.1536 13.7438C13.0625 14.4089 13 15.0478 13 15.5C13 15.9522 13.0625 16.5911 13.1536 17.2562C13.1962 17.5669 13.4331 17.8038 13.7438 17.8464C14.4089 17.9375 15.0478 18 15.5 18C15.9522 18 16.5911 17.9375 17.2562 17.8464C17.5669 17.8038 17.8038 17.5669 17.8464 17.2562C17.9375 16.5911 18 15.9522 18 15.5C18 15.0478 17.9375 14.4089 17.8464 13.7438C17.8038 13.4331 17.5669 13.1962 17.2562 13.1536C16.5911 13.0625 15.9522 13 15.5 13ZM13.4724 11.1721C12.2725 11.3364 11.3364 12.2725 11.1721 13.4724C11.0778 14.1606 11 14.9082 11 15.5C11 16.0918 11.0778 16.8394 11.1721 17.5276C11.3364 18.7275 12.2725 19.6636 13.4724 19.8279C14.1606 19.9222 14.9082 20 15.5 20C16.0918 20 16.8394 19.9222 17.5276 19.8279C18.7275 19.6636 19.6636 18.7275 19.8279 17.5276C19.9222 16.8394 20 16.0918 20 15.5C20 14.9082 19.9222 14.1606 19.8279 13.4724C19.6636 12.2725 18.7275 11.3364 17.5276 11.1721C16.8394 11.0778 16.0918 11 15.5 11C14.9082 11 14.1606 11.0778 13.4724 11.1721Z"
                    fill="#5F6388"
                  />
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M4.5 13C4.04782 13 3.40893 13.0625 2.74381 13.1536C2.43308 13.1962 2.19615 13.4331 2.15359 13.7438C2.0625 14.4089 2 15.0478 2 15.5C2 15.9522 2.0625 16.5911 2.15359 17.2562C2.19615 17.5669 2.43308 17.8038 2.74381 17.8464C3.40893 17.9375 4.04782 18 4.5 18C4.95218 18 5.59107 17.9375 6.25619 17.8464C6.56692 17.8038 6.80385 17.5669 6.84641 17.2562C6.9375 16.5911 7 15.9522 7 15.5C7 15.0478 6.9375 14.4089 6.84641 13.7438C6.80385 13.4331 6.56692 13.1962 6.25619 13.1536C5.59107 13.0625 4.95218 13 4.5 13ZM2.47244 11.1721C1.27253 11.3364 0.336423 12.2725 0.172092 13.4724C0.0778385 14.1606 0 14.9082 0 15.5C0 16.0918 0.0778385 16.8394 0.172092 17.5276C0.336423 18.7275 1.27253 19.6636 2.47244 19.8279C3.16065 19.9222 3.90816 20 4.5 20C5.09184 20 5.83935 19.9222 6.52756 19.8279C7.72747 19.6636 8.66358 18.7275 8.82791 17.5276C8.92216 16.8394 9 16.0918 9 15.5C9 14.9082 8.92216 14.1606 8.82791 13.4724C8.66358 12.2725 7.72747 11.3364 6.52756 11.1721C5.83935 11.0778 5.09184 11 4.5 11C3.90816 11 3.16065 11.0778 2.47244 11.1721Z"
                    fill="#5F6388"
                  />
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M15.5 2C15.0478 2 14.4089 2.0625 13.7438 2.15359C13.4331 2.19615 13.1962 2.43308 13.1536 2.74381C13.0625 3.40893 13 4.04782 13 4.5C13 4.95218 13.0625 5.59107 13.1536 6.25619C13.1962 6.56692 13.4331 6.80385 13.7438 6.84641C14.4089 6.9375 15.0478 7 15.5 7C15.9522 7 16.5911 6.9375 17.2562 6.84641C17.5669 6.80385 17.8038 6.56692 17.8464 6.25619C17.9375 5.59107 18 4.95218 18 4.5C18 4.04782 17.9375 3.40893 17.8464 2.74381C17.8038 2.43308 17.5669 2.19615 17.2562 2.15359C16.5911 2.0625 15.9522 2 15.5 2ZM13.4724 0.172092C12.2725 0.336423 11.3364 1.27253 11.1721 2.47244C11.0778 3.16065 11 3.90816 11 4.5C11 5.09184 11.0778 5.83935 11.1721 6.52756C11.3364 7.72747 12.2725 8.66358 13.4724 8.82791C14.1606 8.92216 14.9082 9 15.5 9C16.0918 9 16.8394 8.92216 17.5276 8.82791C18.7275 8.66358 19.6636 7.72747 19.8279 6.52756C19.9222 5.83935 20 5.09184 20 4.5C20 3.90816 19.9222 3.16065 19.8279 2.47244C19.6636 1.27253 18.7275 0.336423 17.5276 0.172092C16.8394 0.0778385 16.0918 0 15.5 0C14.9082 0 14.1606 0.0778385 13.4724 0.172092Z"
                    fill="#5F6388"
                  />
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M4.5 2C4.04782 2 3.40893 2.0625 2.74381 2.15359C2.43308 2.19615 2.19615 2.43308 2.15359 2.74381C2.0625 3.40893 2 4.04782 2 4.5C2 4.95218 2.0625 5.59107 2.15359 6.25619C2.19615 6.56692 2.43308 6.80385 2.74381 6.84641C3.40893 6.9375 4.04782 7 4.5 7C4.95218 7 5.59107 6.9375 6.25619 6.84641C6.56692 6.80385 6.80385 6.56692 6.84641 6.25619C6.9375 5.59107 7 4.95218 7 4.5C7 4.04782 6.9375 3.40893 6.84641 2.74381C6.80385 2.43308 6.56692 2.19615 6.25619 2.15359C5.59107 2.0625 4.95218 2 4.5 2ZM2.47244 0.172092C1.27253 0.336423 0.336423 1.27253 0.172092 2.47244C0.0778385 3.16065 0 3.90816 0 4.5C0 5.09184 0.0778385 5.83935 0.172092 6.52756C0.336423 7.72747 1.27253 8.66358 2.47244 8.82791C3.16065 8.92216 3.90816 9 4.5 9C5.09184 9 5.83935 8.92216 6.52756 8.82791C7.72747 8.66358 8.66358 7.72747 8.82791 6.52756C8.92216 5.83935 9 5.09184 9 4.5C9 3.90816 8.92216 3.16065 8.82791 2.47244C8.66358 1.27253 7.72747 0.336423 6.52756 0.172092C5.83935 0.0778385 5.09184 0 4.5 0C3.90816 0 3.16065 0.0778385 2.47244 0.172092Z"
                    fill="#5F6388"
                  />
                </svg>
              </li>
            </NavLink>
            <li className="p-[13px] rounded-[14px]">
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M19 8H17V5C17 4.73478 16.8946 4.48043 16.7071 4.29289C16.5196 4.10536 16.2652 4 16 4H11V1C11 0.734784 10.8946 0.48043 10.7071 0.292893C10.5196 0.105357 10.2652 0 10 0C9.73478 0 9.48043 0.105357 9.29289 0.292893C9.10536 0.48043 9 0.734784 9 1V4H4C3.73478 4 3.48043 4.10536 3.29289 4.29289C3.10536 4.48043 3 4.73478 3 5V8H1C0.734784 8 0.48043 8.10536 0.292893 8.29289C0.105357 8.48043 0 8.73478 0 9V15C0 15.2652 0.105357 15.5196 0.292893 15.7071C0.48043 15.8946 0.734784 16 1 16H9V19C9 19.2652 9.10536 19.5196 9.29289 19.7071C9.48043 19.8946 9.73478 20 10 20C10.2652 20 10.5196 19.8946 10.7071 19.7071C10.8946 19.5196 11 19.2652 11 19V16H19C19.2652 16 19.5196 15.8946 19.7071 15.7071C19.8946 15.5196 20 15.2652 20 15V9C20 8.73478 19.8946 8.48043 19.7071 8.29289C19.5196 8.10536 19.2652 8 19 8ZM5 6H15V8H5V6ZM18 14H2V10H18V14Z"
                  fill="#5F6388"
                />
              </svg>
            </li>
            <NavLink to="/">
              <li className="p-[13px] rounded-[14px]">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M19.1578 0.187887C18.442 0.0657961 17.7171 0.00295143 16.9907 4.30177e-06C14.5124 -0.00200751 12.0857 0.70167 10 2.02716C7.90892 0.719074 5.48264 0.032667 3.00928 0.0494471C2.28289 0.0523942 1.55801 0.115239 0.842151 0.23733C0.607668 0.277357 0.395324 0.398967 0.243359 0.580258C0.0913926 0.761549 0.00979153 0.990609 0.0132507 1.22619V13.0925C0.0111118 13.2378 0.0413396 13.3817 0.101783 13.5141C0.162227 13.6466 0.251401 13.7642 0.36296 13.8586C0.474519 13.953 0.605722 14.0219 0.747233 14.0604C0.888743 14.0989 1.03708 14.106 1.1817 14.0813C2.61282 13.836 4.07906 13.8767 5.49404 14.201C6.90903 14.5254 8.24415 15.1269 9.42077 15.97L9.54061 16.0393H9.65046C9.76122 16.0849 9.88002 16.1085 10 16.1085C10.12 16.1085 10.2388 16.0849 10.3495 16.0393H10.4594L10.5792 15.97C11.7476 15.108 13.0789 14.4871 14.4942 14.144C15.9094 13.8008 17.3799 13.7426 18.8183 13.9725C18.9629 13.9973 19.1113 13.9901 19.2528 13.9516C19.3943 13.9131 19.5255 13.8442 19.637 13.7498C19.7486 13.6554 19.8378 13.5378 19.8982 13.4054C19.9587 13.273 19.9889 13.129 19.9867 12.9837V1.11741C19.9764 0.892104 19.8885 0.677085 19.7377 0.508017C19.587 0.33895 19.3824 0.225994 19.1578 0.187887ZM9.00133 13.3298C7.15366 12.3673 5.09702 11.865 3.00928 11.8663C2.67971 11.8663 2.35015 11.8663 2.0106 11.8663V1.97772C2.34322 1.95874 2.67666 1.95874 3.00928 1.97772C5.13983 1.97539 7.2239 2.59446 9.00133 3.75766V13.3298ZM17.9894 11.9058C17.6498 11.9058 17.3203 11.9058 16.9907 11.9058C14.903 11.9046 12.8463 12.4069 10.9987 13.3693V3.75766C12.7761 2.59446 14.8602 1.97539 16.9907 1.97772C17.3233 1.95874 17.6568 1.95874 17.9894 1.97772V11.9058ZM19.1578 16.0096C18.442 15.8875 17.7171 15.8247 16.9907 15.8217C14.5124 15.8197 12.0857 16.5234 10 17.8489C7.91428 16.5234 5.48762 15.8197 3.00928 15.8217C2.28289 15.8247 1.55801 15.8875 0.842151 16.0096C0.712151 16.03 0.587511 16.0757 0.4754 16.144C0.363288 16.2123 0.265917 16.3018 0.188884 16.4075C0.111852 16.5132 0.0566785 16.6329 0.0265368 16.7598C-0.00360488 16.8867 -0.00812012 17.0182 0.0132507 17.1468C0.064002 17.4036 0.215473 17.63 0.434482 17.7764C0.653492 17.9228 0.922184 17.9773 1.1817 17.928C2.61282 17.6826 4.07906 17.7233 5.49404 18.0477C6.90903 18.3721 8.24415 18.9735 9.42077 19.8167C9.58991 19.9359 9.79237 20 10 20C10.2076 20 10.4101 19.9359 10.5792 19.8167C11.7558 18.9735 13.091 18.3721 14.506 18.0477C15.9209 17.7233 17.3872 17.6826 18.8183 17.928C19.0778 17.9773 19.3465 17.9228 19.5655 17.7764C19.7845 17.63 19.936 17.4036 19.9867 17.1468C20.0081 17.0182 20.0036 16.8867 19.9735 16.7598C19.9433 16.6329 19.8881 16.5132 19.8111 16.4075C19.7341 16.3018 19.6367 16.2123 19.5246 16.144C19.4125 16.0757 19.2878 16.03 19.1578 16.0096Z"
                    fill="#5F6388"
                  />
                </svg>
              </li>
            </NavLink>
            <NavLink to="/profile">
              <li className="p-[13px] rounded-[14px] ">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M19.32 7.55L17.43 6.92L18.32 5.14C18.4102 4.95369 18.4404 4.74397 18.4064 4.53978C18.3723 4.33558 18.2758 4.14699 18.13 4L16 1.87C15.8522 1.72209 15.6618 1.62421 15.4555 1.59013C15.2493 1.55605 15.0375 1.58748 14.85 1.68L13.07 2.57L12.44 0.680003C12.3735 0.482996 12.2472 0.311629 12.0787 0.189751C11.9102 0.0678737 11.7079 0.00154767 11.5 3.33354e-06H8.5C8.29036 -0.000537828 8.08585 0.0648223 7.91537 0.186845C7.7449 0.308868 7.61709 0.481382 7.55 0.680003L6.92 2.57L5.14 1.68C4.95369 1.58978 4.74397 1.55961 4.53978 1.59364C4.33558 1.62767 4.14699 1.72423 4 1.87L1.87 4C1.72209 4.14777 1.62421 4.33818 1.59013 4.54446C1.55605 4.75074 1.58748 4.96251 1.68 5.15L2.57 6.93L0.680003 7.56C0.482996 7.62654 0.311629 7.75283 0.189751 7.92131C0.0678737 8.08979 0.00154767 8.29207 3.33354e-06 8.5V11.5C-0.000537828 11.7096 0.0648223 11.9142 0.186845 12.0846C0.308868 12.2551 0.481382 12.3829 0.680003 12.45L2.57 13.08L1.68 14.86C1.58978 15.0463 1.55961 15.256 1.59364 15.4602C1.62767 15.6644 1.72423 15.853 1.87 16L4 18.13C4.14777 18.2779 4.33818 18.3758 4.54446 18.4099C4.75074 18.444 4.96251 18.4125 5.15 18.32L6.93 17.43L7.56 19.32C7.62709 19.5186 7.7549 19.6911 7.92537 19.8132C8.09585 19.9352 8.30036 20.0005 8.51 20H11.51C11.7196 20.0005 11.9242 19.9352 12.0946 19.8132C12.2651 19.6911 12.3929 19.5186 12.46 19.32L13.09 17.43L14.87 18.32C15.0551 18.4079 15.2628 18.4369 15.4649 18.4029C15.667 18.3689 15.8538 18.2737 16 18.13L18.13 16C18.2779 15.8522 18.3758 15.6618 18.4099 15.4555C18.444 15.2493 18.4125 15.0375 18.32 14.85L17.43 13.07L19.32 12.44C19.517 12.3735 19.6884 12.2472 19.8103 12.0787C19.9321 11.9102 19.9985 11.7079 20 11.5V8.5C20.0005 8.29036 19.9352 8.08585 19.8132 7.91537C19.6911 7.7449 19.5186 7.61709 19.32 7.55ZM18 10.78L16.8 11.18C16.5241 11.2695 16.2709 11.418 16.0581 11.6151C15.8452 11.8122 15.6778 12.0533 15.5675 12.3216C15.4571 12.5899 15.4064 12.879 15.419 13.1688C15.4315 13.4586 15.5069 13.7422 15.64 14L16.21 15.14L15.11 16.24L14 15.64C13.7436 15.5122 13.4627 15.4411 13.1763 15.4313C12.89 15.4215 12.6049 15.4734 12.3403 15.5834C12.0758 15.6934 11.8379 15.8589 11.6429 16.0688C11.4479 16.2787 11.3003 16.5281 11.21 16.8L10.81 18H9.22L8.82 16.8C8.73049 16.5241 8.58203 16.2709 8.3849 16.0581C8.18778 15.8452 7.94671 15.6778 7.67842 15.5675C7.41014 15.4571 7.12105 15.4064 6.83123 15.419C6.5414 15.4315 6.25777 15.5069 6 15.64L4.86 16.21L3.76 15.11L4.36 14C4.4931 13.7422 4.56852 13.4586 4.58105 13.1688C4.59358 12.879 4.5429 12.5899 4.43254 12.3216C4.32218 12.0533 4.15478 11.8122 3.94195 11.6151C3.72912 11.418 3.47595 11.2695 3.2 11.18L2 10.78V9.22L3.2 8.82C3.47595 8.73049 3.72912 8.58203 3.94195 8.3849C4.15478 8.18778 4.32218 7.94671 4.43254 7.67842C4.5429 7.41014 4.59358 7.12105 4.58105 6.83123C4.56852 6.5414 4.4931 6.25777 4.36 6L3.79 4.89L4.89 3.79L6 4.36C6.25777 4.4931 6.5414 4.56852 6.83123 4.58105C7.12105 4.59358 7.41014 4.5429 7.67842 4.43254C7.94671 4.32218 8.18778 4.15478 8.3849 3.94195C8.58203 3.72912 8.73049 3.47595 8.82 3.2L9.22 2H10.78L11.18 3.2C11.2695 3.47595 11.418 3.72912 11.6151 3.94195C11.8122 4.15478 12.0533 4.32218 12.3216 4.43254C12.5899 4.5429 12.879 4.59358 13.1688 4.58105C13.4586 4.56852 13.7422 4.4931 14 4.36L15.14 3.79L16.24 4.89L15.64 6C15.5122 6.25645 15.4411 6.53735 15.4313 6.82369C15.4215 7.11003 15.4734 7.39513 15.5834 7.65969C15.6934 7.92424 15.8589 8.16207 16.0688 8.35708C16.2787 8.5521 16.5281 8.69973 16.8 8.79L18 9.19V10.78ZM10 6C9.20888 6 8.43552 6.2346 7.77772 6.67413C7.11993 7.11365 6.60724 7.73836 6.30448 8.46927C6.00173 9.20017 5.92252 10.0044 6.07686 10.7804C6.2312 11.5563 6.61217 12.269 7.17158 12.8284C7.73099 13.3878 8.44372 13.7688 9.21964 13.9231C9.99557 14.0775 10.7998 13.9983 11.5307 13.6955C12.2616 13.3928 12.8864 12.8801 13.3259 12.2223C13.7654 11.5645 14 10.7911 14 10C14 8.93914 13.5786 7.92172 12.8284 7.17158C12.0783 6.42143 11.0609 6 10 6ZM10 12C9.60444 12 9.21776 11.8827 8.88886 11.6629C8.55996 11.4432 8.30362 11.1308 8.15224 10.7654C8.00087 10.3999 7.96126 9.99778 8.03843 9.60982C8.1156 9.22186 8.30608 8.86549 8.58579 8.58579C8.86549 8.30608 9.22186 8.1156 9.60982 8.03843C9.99778 7.96126 10.3999 8.00087 10.7654 8.15224C11.1308 8.30362 11.4432 8.55996 11.6629 8.88886C11.8827 9.21776 12 9.60444 12 10C12 10.5304 11.7893 11.0391 11.4142 11.4142C11.0391 11.7893 10.5304 12 10 12Z"
                    fill="#5F6388"
                  />
                </svg>
              </li>
            </NavLink>
            <NavLink to='/chat'>
            <li className="p-[13px] rounded-[14px]">
              <svg
                width="20"
                height="18"
                viewBox="0 0 20 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M18.183 6.00798L4.19105 0.227983C3.66163 0.00876957 3.08052 -0.0540727 2.51651 0.0468957C1.9525 0.147864 1.42922 0.408415 1.00861 0.797703C0.587999 1.18699 0.287673 1.68871 0.143187 2.24348C-0.00129992 2.79824 0.0161035 3.38281 0.193336 3.92798L1.73246 8.77798L0.153359 13.628C-0.028665 14.1753 -0.0491122 14.7636 0.0944673 15.3223C0.238047 15.881 0.539564 16.3864 0.962896 16.778C1.50722 17.283 2.21946 17.5681 2.96175 17.578C3.35626 17.5777 3.74683 17.4996 4.11109 17.348L18.1531 11.568C18.6999 11.3404 19.1672 10.9559 19.4959 10.4629C19.8246 9.96994 20 9.3906 20 8.79798C20 8.20537 19.8246 7.62603 19.4959 7.13305C19.1672 6.64007 18.6999 6.25555 18.1531 6.02798L18.183 6.00798ZM3.38151 15.478C3.20521 15.5507 3.01179 15.5715 2.82407 15.5379C2.63635 15.5042 2.46218 15.4175 2.32212 15.288C2.19018 15.1618 2.09528 15.0019 2.04771 14.8257C2.00014 14.6494 2.00172 14.4634 2.05227 14.288L3.51144 9.77798L17.2336 9.77798L3.38151 15.478ZM3.51144 7.77798L2.02229 3.30798C1.97174 3.13253 1.97016 2.94658 2.01773 2.7703C2.0653 2.59402 2.1602 2.43413 2.29213 2.30798C2.38619 2.20926 2.49943 2.13083 2.6249 2.07752C2.75037 2.02421 2.88541 1.99714 3.02172 1.99798C3.15569 1.99824 3.28824 2.02545 3.41149 2.07798L17.2336 7.77798L3.51144 7.77798Z"
                  fill="#5F6388"
                />
              </svg>
            </li>
            
            </NavLink>
            <NavLink to="/files">
              <li className="p-[13px] rounded-[14px]">
                <svg
                  width="20"
                  height="19"
                  viewBox="0 0 20 19"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 10H11V9.00002C11 8.73481 10.8946 8.48045 10.7071 8.29292C10.5196 8.10538 10.2652 8.00002 10 8.00002C9.73478 8.00002 9.48043 8.10538 9.29289 8.29292C9.10536 8.48045 9 8.73481 9 9.00002V10H8C7.73478 10 7.48043 10.1054 7.29289 10.2929C7.10536 10.4805 7 10.7348 7 11C7 11.2652 7.10536 11.5196 7.29289 11.7071C7.48043 11.8947 7.73478 12 8 12H9V13C9 13.2652 9.10536 13.5196 9.29289 13.7071C9.48043 13.8947 9.73478 14 10 14C10.2652 14 10.5196 13.8947 10.7071 13.7071C10.8946 13.5196 11 13.2652 11 13V12H12C12.2652 12 12.5196 11.8947 12.7071 11.7071C12.8946 11.5196 13 11.2652 13 11C13 10.7348 12.8946 10.4805 12.7071 10.2929C12.5196 10.1054 12.2652 10 12 10ZM17 3.00002H10.72L10.4 2.00002C10.1926 1.41325 9.80775 0.905526 9.2989 0.547183C8.79005 0.188841 8.18236 -0.0023769 7.56 2.23036e-05H3C2.20435 2.23036e-05 1.44129 0.316093 0.87868 0.878702C0.316071 1.44131 0 2.20437 0 3.00002V16C0 16.7957 0.316071 17.5587 0.87868 18.1213C1.44129 18.684 2.20435 19 3 19H17C17.7956 19 18.5587 18.684 19.1213 18.1213C19.6839 17.5587 20 16.7957 20 16V6.00002C20 5.20437 19.6839 4.44131 19.1213 3.8787C18.5587 3.31609 17.7956 3.00002 17 3.00002ZM18 16C18 16.2652 17.8946 16.5196 17.7071 16.7071C17.5196 16.8947 17.2652 17 17 17H3C2.73478 17 2.48043 16.8947 2.29289 16.7071C2.10536 16.5196 2 16.2652 2 16V3.00002C2 2.73481 2.10536 2.48045 2.29289 2.29292C2.48043 2.10538 2.73478 2.00002 3 2.00002H7.56C7.76964 1.99948 7.97416 2.06484 8.14463 2.18686C8.3151 2.30889 8.44291 2.4814 8.51 2.68002L9.05 4.32002C9.11709 4.51864 9.2449 4.69116 9.41537 4.81318C9.58584 4.9352 9.79036 5.00056 10 5.00002H17C17.2652 5.00002 17.5196 5.10538 17.7071 5.29292C17.8946 5.48045 18 5.73481 18 6.00002V16Z"
                    fill="#5F6388"
                  />
                </svg>
              </li>
            </NavLink>
          </ul>
        </div>
        <div className="horizontal h-[76px] w-full px-4 py-10 bg-white flex justify-between items-center">
          <div className="flex gap-2">
           
          </div>
          <label>
            <input
              placeholder="Search anything..."
              className="px-5 py-[13px] bg-[#F3F7FA] outline-none rounded-[7px] w-[290px]"
              type="text"
            />
            <i className="text-[#94A2BC] relative right-8 fa-solid fa-magnifying-glass"></i>
          </label>
          <div className="flex gap-[30px] items-center">
            <i className="text-[24px] text-[#768396] fa-regular fa-bell"></i>
            <div className="flex items-center gap-[17px]">
              <img
              onClick={handlelocal}
                width={30}
                height={30}
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnG9XsiAuW2P1NkrMyXF-qAnh2to04EpRvIg&s"
                className="rounded-[30px] cursor-pointer"
                alt=""
              />
              <i className="text-[24px] text-def-blue fa-solid fa-angle-down"></i>
            </div>
          </div>
        </div>
      </div>
      <div className="relative left-[90px] bottom-[1144px] w-[1426px] flex justify-center">
        {children}
      </div>
    </div>
  );
}

export default MainLayout;
