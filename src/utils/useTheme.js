export const darkTheme = {
  primary: "#00ff88",
  secondary: "#00ffee",
  background: "linear-gradient(135deg, #0f1729, #1a1f35)",
  cardBg: "rgba(255, 255, 255, 0.05)",
  text: "#ffffff",
  inputBg: "rgba(255, 255, 255, 0.05)",
  inputBorder: "rgba(255, 255, 255, 0.1)",
  inputText: "#ffffff",
  inputPlaceholder: "rgba(255, 255, 255, 0.5)",
  error: "#ff4466",
  shadow: "rgba(31, 38, 135, 0.37)",
  buttonText: "#0f1729",
  iconColor: "rgba(255, 255, 255, 0.5)",
};

export const lightTheme = {
  primary: "#00ff88",
  secondary: "#00ffee",
  background: "linear-gradient(135deg, #f0f2f5, #ffffff)",
  cardBg: "rgba(255, 255, 255, 0.9)",
  text: "#1a1f35",
  inputBg: "rgba(0, 0, 0, 0.05)",
  inputBorder: "rgba(0, 0, 0, 0.1)",
  inputText: "#1a1f35",
  inputPlaceholder: "rgba(0, 0, 0, 0.5)",
  error: "#ff4466",
  shadow: "rgba(31, 38, 135, 0.15)",
  buttonText: "#ffffff",
  iconColor: "rgba(0, 0, 0, 0.5)",
};

export const sunsetTheme = {
  primary: "#FF6B6B",
  secondary: "#4ECDC4",
  background: "linear-gradient(135deg, #FFE5E5, #FFF0F0)",
  cardBg: "rgba(255, 255, 255, 0.95)",
  text: "#2C3E50",
  inputBg: "rgba(255, 107, 107, 0.05)",
  inputBorder: "rgba(255, 107, 107, 0.2)",
  inputText: "#2C3E50",
  inputPlaceholder: "rgba(44, 62, 80, 0.5)",
  error: "#E74C3C",
  shadow: "rgba(255, 107, 107, 0.15)",
  buttonText: "#ffffff",
  iconColor: "rgba(44, 62, 80, 0.6)",
};

export const midnightTheme = {
  primary: "#6C5CE7",
  secondary: "#A8E6CF",
  background: "linear-gradient(135deg, #0C0C14, #191927)",
  cardBg: "rgba(108, 92, 231, 0.1)",
  text: "#FFFFFF",
  inputBg: "rgba(108, 92, 231, 0.1)",
  inputBorder: "rgba(108, 92, 231, 0.2)",
  inputText: "#FFFFFF",
  inputPlaceholder: "rgba(255, 255, 255, 0.5)",
  error: "#FF6B6B",
  shadow: "rgba(108, 92, 231, 0.3)",
  buttonText: "#191927",
  iconColor: "rgba(255, 255, 255, 0.7)",
};

export const natureTheme = {
  primary: "#4CAF50",
  secondary: "#81C784",
  background: "linear-gradient(135deg, #E8F5E9, #F1F8E9)",
  cardBg: "rgba(255, 255, 255, 0.9)",
  text: "#1B5E20",
  inputBg: "rgba(76, 175, 80, 0.05)",
  inputBorder: "rgba(76, 175, 80, 0.2)",
  inputText: "#1B5E20",
  inputPlaceholder: "rgba(27, 94, 32, 0.5)",
  error: "#FF5252",
  shadow: "rgba(76, 175, 80, 0.15)",
  buttonText: "#ffffff",
  iconColor: "rgba(27, 94, 32, 0.6)",
};

export const oceanTheme = {
  primary: "#0288D1",
  secondary: "#4FC3F7",
  background: "linear-gradient(135deg, #E1F5FE, #E3F2FD)",
  cardBg: "rgba(255, 255, 255, 0.9)",
  text: "#01579B",
  inputBg: "rgba(2, 136, 209, 0.05)",
  inputBorder: "rgba(2, 136, 209, 0.2)",
  inputText: "#01579B",
  inputPlaceholder: "rgba(1, 87, 155, 0.5)",
  error: "#FF5252",
  shadow: "rgba(2, 136, 209, 0.15)",
  buttonText: "#ffffff",
  iconColor: "rgba(1, 87, 155, 0.6)",
};

import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toggleThemeRed } from "../redux/AuthSlice";
import {
  FaSun,
  FaMoon,
  FaCloudSun,
  FaCloudMoon,
  FaLeaf,
  FaWater,
} from "react-icons/fa";

const THEMES = {
  light: {
    icon: FaSun,
    label: "Light",
    background: `linear-gradient(45deg, ${lightTheme.primary}, ${lightTheme.secondary})`,
  },
  dark: {
    icon: FaMoon,
    label: "Dark",
    background: `linear-gradient(45deg, ${darkTheme.primary}, ${darkTheme.secondary})`,
  },
  sunset: {
    icon: FaCloudSun,
    label: "Sunset",
    background: `linear-gradient(45deg, ${sunsetTheme.primary}, ${sunsetTheme.secondary})`,
  },
  midnight: {
    icon: FaCloudMoon,
    label: "Midnight",
    background: `linear-gradient(45deg, ${midnightTheme.primary}, ${midnightTheme.secondary})`,
  },
  nature: {
    icon: FaLeaf,
    label: "Nature",
    background: `linear-gradient(45deg, ${natureTheme.primary}, ${natureTheme.secondary})`,
  },
  ocean: {
    icon: FaWater,
    label: "Ocean",
    background: `linear-gradient(45deg, ${oceanTheme.primary}, ${oceanTheme.secondary})`,
  },
};

export const useTheme = () => {
  const dispatch = useDispatch();
  const [theme, setTheme] = useState(darkTheme);
  const currentTheme = useSelector((state) => state.auth.currentTheme);

  const getThemeByName = (themeName) => {
    const themes = {
      light: lightTheme,
      dark: darkTheme,
      sunset: sunsetTheme,
      midnight: midnightTheme,
      nature: natureTheme,
      ocean: oceanTheme,
    };
    return themes[themeName] || darkTheme;
  };

  const toggleTheme = (themeName) => {
    dispatch(toggleThemeRed(themeName));
  };

  useEffect(() => {
    setTheme(getThemeByName(currentTheme));
  }, [currentTheme]);

  return { theme, currentTheme, toggleTheme, THEMES };
};
