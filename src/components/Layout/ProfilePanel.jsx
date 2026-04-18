import { useEffect, useState } from "react";
import { X, LogOut, Upload, Eye, EyeOff } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

const ProfilePanel = () => {
  const dispatch = useDispatch();
  const { isProfileOpen } = useSelector((state) => state.popup);
  return <></>;
};

export default ProfilePanel;
