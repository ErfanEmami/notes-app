import React from "react"

import Flex from './components/Flex/flex';
import Page from './components/Page/page';
import Header from './components/Header/header';
import ControlPanel from "./components/ControlPanel/control_panel";
import NotesPanel from "./components/NotesPanel/ notes_panel";
import { AppContextProvider } from "./context/app_context";
import withNotes from "./components/HOCS/with_notes";
import withRequestUI from "./components/HOCS/with_request_ui";
import withAuth from "./components/HOCS/with_auth";

const AppContent = ({notes, handleAddNote, handleDeleteNote, handleCompleteNote}) => {
    return (
      <Page>
        <Header todo_count={2} todo_done={2}/>
        <Flex h100>
          <Flex column style={{flex: "2", borderRight: "1px solid black", overflowY: "scroll"}}>
            <NotesPanel 
              notes={notes} 
              handleDeleteNote={handleDeleteNote} 
              handleCompleteNote={handleCompleteNote} 
            />
          </Flex>
          <Flex column style={{flex: "1"}}>
            <ControlPanel 
              handleAddNote={handleAddNote} 
            />
          </Flex>
        </Flex>
      </Page>
    )
}

const NotesApp = withRequestUI(withAuth(withNotes(AppContent))) 

const App = () => (
  <AppContextProvider>
    <NotesApp />
  </AppContextProvider>  
)


export default App;
