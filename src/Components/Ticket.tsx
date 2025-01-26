import React, { useEffect } from "react";
import { TicketUserData } from "./types";


type TTicketProps = {
  userData: TicketUserData[];
};

const Ticket: React.FC<TTicketProps> = ({ userData }) => {
  console.log(userData)
  useEffect(() => {
    const objectUrls = userData.map((user) =>
      user.avatar ? URL.createObjectURL(user.avatar) : null
    );

    return () => {
      objectUrls.forEach((url) => {
        if (url) URL.revokeObjectURL(url);
      });
    };
  }, [userData]);

  const getAvatarUrl = (avatar: File | null | undefined) =>
    avatar ? URL.createObjectURL(avatar) : "/assets/images/image-avatar.jpg";

  return (
    <div className="text-center space-y-8 lg:w-[35rem]">
      {userData.map(({ avatar, name, email, githubUsername, id }) => (
        <div key={id} className="space-y-8">
          {/* Congrats Header */}
          <h2 className="mt-4 heading">
            Congrats,{" "}
            <span className="text-gradient bg-gradient-to-r from-From via-pink-500 to-To bg-clip-text text-transparent capitalize">
              {name || "Guest"}
            </span>
            !
            <br />
            Your ticket is ready.
          </h2>

          {/* Info */}
          <h3 className="lg:px-[4rem] sm:text-lg">
            We've emailed your ticket to{" "}
            <span className="text-orange-500 lowercase">{email || "unknown"}</span> and will send
            updates in the run-up to the event.
          </h3>

          {/* Ticket */}
          <div className="mt-10 relative">
            <img
              src="/assets/images/pattern-ticket.svg"
              alt="Pattern ticket"
              className="lg:h-[14rem] mx-auto sm:h-[11rem]"
            />

            {/* Ticket Details */}
            <div className="absolute top-1/2 lg:left-10 sm:left-4 sm:p-2 transform -translate-y-1/2 lg:px-4 space-y-6">
              <div className="flex flex-col justify-start lg:space-y-14 sm:space-y-7">
                {/* Logo and Event Date */}
                <div>
                  <img
                    src="/assets/images/logo-full.svg"
                    alt="Event logo"
                    className="sm:h-7"
                  />
                  <p className="text-[12px] text-Neutral300 pl-6 pt-1">
                    Jan 31, 2025 / Austin, TX
                  </p>
                </div>

                {/* User Info */}
                <div className="flex items-center space-x-2">
                  <img
                    src={getAvatarUrl(avatar)}
                    alt={`${name || "Guest"}'s avatar`}
                    className="lg:h-16 lg:w-16 sm:h-12 rounded-lg"
                  />
                  <div className="flex flex-col justify-center text-left pl-2">
                    <p>{name || "Guest"}</p>
                    <p className="flex items-center">
                      <img
                        src="/assets/images/icon-github.svg"
                        alt="GitHub icon"
                        className="inline-block w-4 h-4 mr-1"
                      />
                      @{githubUsername || "unknown"}
                    </p>
                  </div>
                </div>

                {/* Ticket ID */}
                <div
                  className="absolute lg:right-[-14rem] sm:right-[-10rem]
                  sm:top-[25%] lg:top-[20%] transform -translate-y-1/4
                  text-Neutral500 rotate-90"
                >
                  <p>#{id}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Ticket;
