import React from "react";

 const Context = React.createContext({
  notes: [],
  folders: [],
  deleteNote: () => {},
  addFolder: () => {}
});


export default Context;