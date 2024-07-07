import React from "react";
//هذا الملف من أجل نقل التابع المسؤول عن تغيير الثيم من الكومبوننت المعرف فيه الى كومبوننت آخر
const ThemeContext = React.createContext({
  mode: "",
  setMode: null,
});

export default ThemeContext;
