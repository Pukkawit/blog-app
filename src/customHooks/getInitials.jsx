import React from "react";

const useGetInitials = (firstName, lastName) => {
  let initials = firstName[0] + lastName[0];
  let fullName = `${firstName} ${lastName}`;

  return { initials, fullName };
};

export default useGetInitials;
