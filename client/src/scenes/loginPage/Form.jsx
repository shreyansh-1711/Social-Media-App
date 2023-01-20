import { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { Formik } from "formik";
import * as yup from "yup"
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLogin } from "state";
import Dropzone from "react-dropzone";
import FlexBetween from "components/FlexBetween";

const registerSchema = yup.object().shape({
    firstName:
    lastName:
    email:
    password:
    occupation:
    picture:
    
})

