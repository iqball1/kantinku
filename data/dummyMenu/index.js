import React from 'react';
import { IconChangePassword, IconEditProfile, IconHistory, IconSignOut } from "../../assets";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { colors } from '../../utils';


export const dummyMenu = [
  {
    id: 1,
    nama: 'Edit Profile',
    gambar: <Ionicons name="person-circle" size={30} style={{ color: colors.primary }} />,
    halaman: 'EditProfile'
  },
  {
    id: 2,
    nama: 'Ganti Password',
    gambar: <Ionicons name="lock-closed" size={30} style={{ color: colors.primary }} />,
    halaman: 'ChangePassword'
  },
  {
    id: 3,
    nama: 'History Pemesanan',
    gambar: <Ionicons name="fast-food" size={30} style={{color:colors.primary}}  />,
    halaman: 'History'
  },
];